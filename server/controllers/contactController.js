import Contact from "../models/Contact.js";
import SystemSettings from "../models/SystemSettings.js";
import { sendEmail } from "../utils/emailService.js";
import { generateEmailHtml } from "../utils/emailTemplates.js";

// Create a new contact message (Public)
export const createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();

        // Get admin email from settings
        const settings = await SystemSettings.findOne();
        const adminEmail = settings?.contactEmail || process.env.EMAIL_USER;

        const { name, email, subject, message } = req.body;

        // ===== SEND EMAIL TO ADMIN =====
        const adminEmailHtml = generateEmailHtml({
            title: "New Contact Message",
            greeting: "Hello Admin,",
            intro: `You have received a new contact message from ${name} via the website contact form.`,
            details: {
                "Sender Name": name,
                "Sender Email": email,
                "Subject": subject,
                "Message Content": message,
                "Received At": new Date().toLocaleString()
            },
            actionText: "Reply Now",
            actionUrl: `mailto:${email}?subject=Re: ${subject}`
        });

        await sendEmail({
            to: adminEmail,
            subject: `Message Received: ${subject}`,
            html: adminEmailHtml,
            replyTo: email,
        });

        // ===== SEND CONFIRMATION EMAIL TO USER =====
        const userEmailHtml = generateEmailHtml({
            title: "We Received Your Message",
            greeting: `Hello ${name},`,
            intro: `Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.`,
            details: {
                "Name": name,
                "Email": email,
                "Subject": subject,
                "Message": message,
                "Received At": new Date().toLocaleString()
            },
            actionText: "Visit Our Website",
            actionUrl: `${process.env.SITE_URL || 'https://thepatilphotography.com'}`
        });

        await sendEmail({
            to: email,
            subject: `Thank You! We've Received Your Message`,
            html: userEmailHtml,
            replyTo: adminEmail,
        });

        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all contact messages (Admin)
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update contact status (Admin)
export const updateContactStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete contact (Admin)
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
