import LoveStory from "../models/LoveStory.js";

// Get all love stories
export const getAllLoveStories = async (req, res) => {
    try {
        // always return in display order; fallback to newest when order is equal/undefined
        const stories = await LoveStory.find().sort({ order: 1, createdAt: -1 });

        // ensure every document has an order value (migration for existing records)
        const missing = stories.filter(s => s.order == null);
        if (missing.length) {
            await Promise.all(
                missing.map((s, i) =>
                    LoveStory.findByIdAndUpdate(s._id, { order: stories.indexOf(s) + 1 })
                )
            );
        }

        res.json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single love story
export const getLoveStoryById = async (req, res) => {
    try {
        const story = await LoveStory.findById(req.params.id);
        if (!story) return res.status(404).json({ message: "Story not found" });
        res.json(story);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new love story
export const createLoveStory = async (req, res) => {
    try {
        // if no explicit order provided, place at end
        if (req.body.order == null) {
            const last = await LoveStory.findOne().sort({ order: -1 });
            req.body.order = last && last.order != null ? last.order + 1 : 1;
        }

        const story = new LoveStory(req.body);
        await story.save();
        res.status(201).json(story);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update love story
export const updateLoveStory = async (req, res) => {
    try {
        const story = await LoveStory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!story) return res.status(404).json({ message: "Story not found" });
        res.json(story);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete love story
export const deleteLoveStory = async (req, res) => {
    try {
        const story = await LoveStory.findByIdAndDelete(req.params.id);
        if (!story) return res.status(404).json({ message: "Story not found" });
        res.json({ message: "Story deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
