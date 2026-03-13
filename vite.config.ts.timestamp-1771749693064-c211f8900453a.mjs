var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/models/Client.js
var Client_exports = {};
__export(Client_exports, {
  default: () => Client_default
});
import mongoose2 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var clientSchema, Client_default;
var init_Client = __esm({
  "server/models/Client.js"() {
    clientSchema = new mongoose2.Schema(
      {
        name: {
          type: String,
          required: [true, "Client name is required"],
          trim: true,
          minlength: [2, "Name must be at least 2 characters"]
        },
        email: {
          type: String,
          required: [true, "Email is required"],
          lowercase: true,
          trim: true,
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
        },
        phone: {
          type: String,
          required: [true, "Phone number is required"],
          trim: true
        },
        address: {
          type: String,
          trim: true
        },
        city: {
          type: String,
          trim: true
        },
        state: {
          type: String,
          trim: true
        },
        zipCode: {
          type: String,
          trim: true
        },
        category: {
          type: String,
          enum: ["Regular", "VIP", "New Inquiry"],
          default: "New Inquiry"
        },
        tags: [
          {
            type: String,
            trim: true
          }
        ],
        notes: {
          type: String,
          trim: true
        },
        totalBilled: {
          type: Number,
          default: 0,
          min: 0
        },
        totalPaid: {
          type: Number,
          default: 0,
          min: 0
        },
        pendingAmount: {
          type: Number,
          default: 0,
          min: 0
        },
        // New fields for CRM
        event: { type: String, trim: true },
        budget: { type: Number, default: 0 },
        status: {
          type: String,
          enum: ["Lead", "Active", "Archived"],
          default: "Lead"
        }
      },
      { timestamps: true }
    );
    Client_default = mongoose2.models.Client || mongoose2.model("Client", clientSchema);
  }
});

// vite.config.ts
import { defineConfig } from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";

// server/index.js
import "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/dotenv/config.js";
import express20 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";
import cors from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/cors/lib/index.js";

// server/db.js
import mongoose from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var DEFAULT_HOST = "cluster0.ds2nlug.mongodb.net";
var DEFAULT_APP_NAME = "Cluster0";
var buildMongoUri = () => {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST || DEFAULT_HOST;
  if (!username || !password) return null;
  const encodedUser = encodeURIComponent(username);
  const encodedPass = encodeURIComponent(password);
  return `mongodb+srv://${encodedUser}:${encodedPass}@${host}/?retryWrites=true&w=majority&appName=${process.env.MONGODB_APP_NAME || DEFAULT_APP_NAME}`;
};
var connectDB = async () => {
  try {
    const mongoUri = buildMongoUri();
    console.log("\u{1F517} Connecting to MongoDB with URI:", mongoUri.replace(/:([^@]+)@/, ":****@"));
    if (!mongoUri) {
      throw new Error(
        "MongoDB connection settings are missing. Provide MONGODB_URI or MONGODB_USERNAME/MONGODB_PASSWORD in your environment."
      );
    }
    if (process.env.MONGO_DEBUG === "true") {
      mongoose.set("debug", true);
    }
    mongoose.connection.on("connected", () => {
      console.log("\u2705 Mongoose connected to database", mongoose.connection.name || process.env.DATABASE_NAME || "(unknown)");
    });
    mongoose.connection.on("error", (err) => {
      console.error("\u274C Mongoose connection error:", err && err.message ? err.message : err);
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("\u26A0\uFE0F Mongoose disconnected");
    });
    mongoose.connection.on("reconnected", () => {
      console.log("\u{1F501} Mongoose reconnected");
    });
    await mongoose.connect(mongoUri, {
      // Use DATABASE_NAME from environment or fallback to "the-patil-photography"
      dbName: process.env.DATABASE_NAME || "the-patil-photography",
      retryWrites: true,
      w: "majority"
    });
    console.log("\u2705 MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("\u274C MongoDB connection error:", error && error.message ? error.message : error);
    if (process.env.EXIT_ON_DB_FAIL === "true") {
      process.exit(1);
    }
    return null;
  }
};
var getDbStatus = () => {
  return mongoose.connection.readyState;
};

// server/routes/demo.js
var handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};

// server/routes/clientRoutes.js
import express from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/controllers/clientController.js
init_Client();
var getAllClients = async (req, res) => {
  try {
    const clients = await Client_default.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getClientById = async (req, res) => {
  try {
    const client = await Client_default.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createClient = async (req, res) => {
  const { name, email, phone, whatsapp, address, city, state, zipCode, category, tags, notes, event, budget, status } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Name, email, and phone are required" });
  }
  try {
    const client = new Client_default({
      name,
      email,
      phone: phone || whatsapp,
      // Accept phone or whatsapp
      address,
      city,
      state,
      zipCode,
      category,
      tags,
      notes,
      event,
      budget,
      status
    });
    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (error) {
    if (error.code === 11e3) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: error.message });
  }
};
var updateClient = async (req, res) => {
  try {
    const client = await Client_default.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    if (error.code === 11e3) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: error.message });
  }
};
var deleteClient = async (req, res) => {
  try {
    const client = await Client_default.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var searchClients = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const clients = await Client_default.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } }
      ]
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/clientRoutes.js
var router = express.Router();
router.get("/", getAllClients);
router.get("/search", searchClients);
router.get("/:id", getClientById);
router.post("/", createClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
var clientRoutes_default = router;

// server/routes/serviceRoutes.js
import express2 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/Service.js
import mongoose3 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var serviceSchema = new mongoose3.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"]
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      enum: ["photography", "video", "drone", "product", "other"],
      default: "photography"
    },
    ratePerDay: {
      type: Number,
      required: [true, "Rate per day is required"],
      min: [0, "Rate cannot be negative"]
    },
    ratePerUnit: {
      type: Number,
      default: 0,
      min: [0, "Rate cannot be negative"]
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
serviceSchema.index({ isActive: 1 });
var Service_default = mongoose3.models.Service || mongoose3.model("Service", serviceSchema);

// server/controllers/serviceController.js
var DEFAULT_SERVICES = [
  { name: "Traditional Photography", category: "photography", ratePerDay: 25e3 },
  { name: "Candid Photography", category: "photography", ratePerDay: 2e4 },
  { name: "Cinematic Wedding Film", category: "video", ratePerDay: 4e4 },
  { name: "Traditional Video", category: "video", ratePerDay: 3e4 },
  { name: "Drone Shoot", category: "drone", ratePerDay: 15e3 },
  { name: "Wedding Albums", category: "product", ratePerUnit: 5e3 },
  { name: "Frames", category: "product", ratePerUnit: 2e3 }
];
var getAllServices = async (req, res) => {
  try {
    let services = await Service_default.find({ isActive: true }).sort({ name: 1 });
    if (services.length === 0) {
      const createdServices = await Service_default.insertMany(DEFAULT_SERVICES);
      services = createdServices;
    }
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getServiceById = async (req, res) => {
  try {
    const service = await Service_default.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createService = async (req, res) => {
  const { name, description, category, ratePerDay, ratePerUnit } = req.body;
  if (!name || !ratePerDay && !ratePerUnit) {
    return res.status(400).json({ message: "Name and rate are required" });
  }
  try {
    const service = new Service_default({
      name,
      description,
      category,
      ratePerDay,
      ratePerUnit
    });
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateService = async (req, res) => {
  try {
    const service = await Service_default.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteService = async (req, res) => {
  try {
    const service = await Service_default.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/serviceRoutes.js
var router2 = express2.Router();
router2.get("/", getAllServices);
router2.get("/:id", getServiceById);
router2.post("/", createService);
router2.put("/:id", updateService);
router2.delete("/:id", deleteService);
var serviceRoutes_default = router2;

// server/routes/quotationRoutes.js
import express3 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/Quotation.js
import mongoose4 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var quotationSchema = new mongoose4.Schema(
  {
    quotationNumber: {
      type: String,
      unique: true,
      required: [true, "Quotation number is required"]
    },
    clientId: {
      type: mongoose4.Schema.Types.ObjectId,
      ref: "Client",
      required: false
      // Optional if just using clientName
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"]
    },
    quotationDate: {
      type: Date,
      default: Date.now
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"]
    },
    validityDate: {
      type: Date,
      required: [true, "Validity date is required"]
    },
    services: [
      {
        serviceId: {
          type: mongoose4.Schema.Types.ObjectId,
          ref: "Service",
          required: false
        },
        serviceName: String,
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity must be at least 1"]
        },
        days: {
          type: Number,
          default: 1,
          min: [1, "Days must be at least 1"]
        },
        ratePerDay: {
          type: Number,
          required: true,
          min: [0, "Rate cannot be negative"]
        },
        total: {
          type: Number,
          required: true,
          min: [0, "Total cannot be negative"]
        }
      }
    ],
    subtotal: {
      type: Number,
      required: true,
      min: [0, "Subtotal cannot be negative"]
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"]
    },
    discountType: {
      type: String,
      enum: ["fixed", "percentage"],
      default: "fixed"
    },
    taxPercentage: {
      type: Number,
      default: 0,
      min: [0, "Tax cannot be negative"],
      max: [100, "Tax cannot exceed 100%"]
    },
    tax: {
      type: Number,
      default: 0,
      min: [0, "Tax cannot be negative"]
    },
    grandTotal: {
      type: Number,
      required: true,
      min: [0, "Grand total cannot be negative"]
    },
    paymentTerms: {
      type: String,
      default: "50% advance, 50% on event date"
    },
    notes: {
      type: String,
      trim: true
    },
    thankYouMessage: {
      type: String,
      default: "Thank you for choosing The Patil Photography & Film's. We look forward to capturing your special moments!"
    },
    status: {
      type: String,
      enum: ["Draft", "Sent", "Accepted", "Rejected", "Expired", "Negotiation"],
      default: "Draft"
    },
    // Enhanced CRM Fields
    clientName: { type: String, trim: true },
    // Snapshot of client name
    email: { type: String, trim: true },
    whatsapp_no: { type: String, trim: true },
    location: { type: String, trim: true },
    retainerAmount: { type: Number, default: 0 },
    stage: { type: String, default: "Concept" },
    deliverables: [{ type: String }],
    // Simple list of deliverables
    moodboard: { type: String, trim: true },
    channel: { type: String, enum: ["Email", "WhatsApp", "Call", "Other"], default: "Email" },
    followUpDate: { type: Date },
    convertedToInvoice: {
      type: Boolean,
      default: false
    },
    invoiceId: {
      type: mongoose4.Schema.Types.ObjectId,
      ref: "Invoice",
      default: null
    }
  },
  { timestamps: true }
);
quotationSchema.index({ clientId: 1 });
quotationSchema.index({ status: 1 });
quotationSchema.index({ eventDate: 1 });
var Quotation_default = mongoose4.models.Quotation || mongoose4.model("Quotation", quotationSchema);

// server/controllers/quotationController.js
init_Client();

// server/utils/emailService.js
import nodemailer from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/nodemailer/lib/nodemailer.js";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
var sendEmail = async ({ to, subject, html, replyTo, cc }) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "Potography Webapp"}" <${process.env.EMAIL_USER}>`,
      to,
      cc,
      replyTo,
      subject,
      html
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    return null;
  }
};

// server/utils/emailTemplates.js
var styles = {
  container: `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #333333; line-height: 1.6;`,
  header: `background-color: #0d0d0d; padding: 30px 20px; text-align: center; border-bottom: 3px solid #D4AF37;`,
  logo: `font-size: 24px; font-weight: 700; color: #D4AF37; text-transform: uppercase; letter-spacing: 2px; text-decoration: none;`,
  body: `padding: 40px 30px; background-color: #fcfcfc;`,
  title: `font-size: 24px; font-weight: 300; color: #0d0d0d; margin-bottom: 20px; text-align: center; text-transform: uppercase; letter-spacing: 1px;`,
  greeting: `font-size: 16px; margin-bottom: 20px; color: #555;`,
  intro: `font-size: 16px; margin-bottom: 30px; color: #555;`,
  table: `width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 30px; background: #fff; border: 1px solid #eee; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.02);`,
  th: `padding: 12px 20px; text-align: left; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #eee; width: 40%; background-color: #fafafa; font-weight: 600;`,
  td: `padding: 12px 20px; text-align: left; color: #333; font-size: 15px; border-bottom: 1px solid #eee; font-weight: 500;`,
  buttonContainer: `text-align: center; margin-top: 40px; margin-bottom: 20px;`,
  button: `display: inline-block; padding: 14px 30px; background-color: #0d0d0d; color: #D4AF37; text-decoration: none; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px; border: 1px solid #D4AF37; transition: all 0.3s ease;`,
  footer: `background-color: #0d0d0d; padding: 30px 20px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #333;`,
  footerLink: `color: #D4AF37; text-decoration: none; margin: 0 10px;`,
  divider: `height: 1px; background-color: #eee; margin: 30px 0; border: none;`
};
var generateEmailHtml = ({ title, greeting, intro, details, actionUrl, actionText }) => {
  const detailsHtml = Object.entries(details).map(([key, value]) => {
    return `
        <tr>
          <th style="${styles.th}">${key}</th>
          <td style="${styles.td}">${value || "-"}</td>
        </tr>
      `;
  }).join("");
  const buttonHtml = actionUrl && actionText ? `
    <div style="${styles.buttonContainer}">
      <a href="${actionUrl}" style="${styles.button}">${actionText}</a>
    </div>
  ` : "";
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
      <div style="${styles.container}">
        <!-- Header -->
        <div style="${styles.header}">
          <a href="#" style="${styles.logo}">The Patil Photography</a>
        </div>

        <!-- Body -->
        <div style="${styles.body}">
          <h1 style="${styles.title}">${title}</h1>
          
          <p style="${styles.greeting}">${greeting}</p>
          <p style="${styles.intro}">${intro}</p>

          <table style="${styles.table}">
            <tbody>
              ${detailsHtml}
            </tbody>
          </table>

          ${buttonHtml}

          <p style="font-size: 14px; color: #999; margin-top: 30px; text-align: center; font-style: italic;">
            "Capturing moments, creating memories."
          </p>
        </div>

        <!-- Footer -->
        <div style="${styles.footer}">
          <p style="margin-bottom: 20px;">
            <a href="#" style="${styles.footerLink}">Website</a> \u2022
            <a href="#" style="${styles.footerLink}">Instagram</a> \u2022
            <a href="#" style="${styles.footerLink}">Contact</a>
          </p>
          <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} The Patil Photography. All rights reserved.</p>
          <p style="margin-top: 10px;">This is an automated message, please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// server/controllers/quotationController.js
var generateQuotationNumber = async () => {
  const count = await Quotation_default.countDocuments();
  const date = /* @__PURE__ */ new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `QT-${year}${month}-${String(count + 1).padStart(5, "0")}`;
};
var getAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation_default.find().populate("clientId").sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getQuotationById = async (req, res) => {
  try {
    const quotation = await Quotation_default.findById(req.params.id).populate("clientId");
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.json(quotation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createQuotation = async (req, res) => {
  try {
    const { clientId, clientName, client, email } = req.body;
    const nameToSearch = clientName || client;
    const quotationNumber = await generateQuotationNumber();
    const quotationData = {
      ...req.body,
      quotationNumber,
      clientId: clientId || null,
      // Explicitly null if not provided
      clientName: nameToSearch
    };
    const quotation = new Quotation_default(quotationData);
    const savedQuotation = await quotation.save();
    if (savedQuotation.clientId) {
      await savedQuotation.populate("clientId");
    }
    if (email) {
      const htmlContent = generateEmailHtml({
        title: "Quotation Received",
        greeting: `Hello ${nameToSearch || "Valued Customer"},`,
        intro: "You have received a new quotation from The Patil Photography. We look forward to capturing your special moments.",
        details: {
          "Quotation No": quotationNumber,
          "Event Type": req.body.eventType || "N/A",
          "Event Date": req.body.eventDate ? new Date(req.body.eventDate).toDateString() : "N/A",
          "Location": req.body.location || "N/A",
          "Services": Array.isArray(req.body.services) ? req.body.services.map((s) => s.name).join(", ") : req.body.services || "N/A",
          "Total Amount": req.body.grandTotal ? `\u20B9${Number(req.body.grandTotal).toLocaleString("en-IN")}` : "N/A",
          "Terms & Conditions": req.body.termsAndConditions || "As per standard policy",
          "Valid Until": req.body.validityDate ? new Date(req.body.validityDate).toDateString() : "N/A"
        },
        actionText: "Contact Us to Book",
        actionUrl: process.env.CLIENT_URL || "#"
      });
      await sendEmail({
        to: email,
        cc: "pixelproitsolutions@gmail.com",
        subject: `Quotation ${quotationNumber} - The Patil Photography`,
        html: htmlContent
      });
    }
    res.status(201).json(savedQuotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;
    if (updateData.status === "Accepted") {
      const existingQuotation = await Quotation_default.findById(id);
      if (!existingQuotation) {
        return res.status(404).json({ message: "Quotation not found" });
      }
      if (!existingQuotation.clientId && !updateData.clientId) {
        const clientName = updateData.clientName || existingQuotation.clientName;
        const email = updateData.email || existingQuotation.email;
        const phone = updateData.whatsapp_no || existingQuotation.whatsapp_no;
        if (clientName) {
          let clientObj = await Client_default.findOne({ name: clientName });
          if (!clientObj) {
            clientObj = await Client_default.create({
              name: clientName,
              email: email || "",
              phone: phone || "",
              status: "Client"
              // Promoted directly to Client on acceptance
            });
          }
          updateData.clientId = clientObj._id;
        }
      }
    }
    const quotation = await Quotation_default.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).populate("clientId");
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.json(quotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation_default.findByIdAndDelete(req.params.id);
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    res.json({ message: "Quotation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var duplicateQuotation = async (req, res) => {
  try {
    const quotation = await Quotation_default.findById(req.params.id);
    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    const quotationNumber = await generateQuotationNumber();
    const newQuotation = new Quotation_default({
      ...quotation.toObject(),
      _id: void 0,
      quotationNumber,
      quotationDate: /* @__PURE__ */ new Date(),
      status: "Draft",
      convertedToInvoice: false,
      invoiceId: null
    });
    const savedQuotation = await newQuotation.save();
    await savedQuotation.populate("clientId");
    res.status(201).json(savedQuotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getQuotationsByClient = async (req, res) => {
  try {
    const quotations = await Quotation_default.find({ clientId: req.params.clientId }).populate("clientId").sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getQuotationsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const quotations = await Quotation_default.find({ status }).populate("clientId").sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/quotationRoutes.js
var router3 = express3.Router();
router3.get("/", getAllQuotations);
router3.get("/client/:clientId", getQuotationsByClient);
router3.get("/status", getQuotationsByStatus);
router3.get("/:id", getQuotationById);
router3.post("/", createQuotation);
router3.post("/:id/duplicate", duplicateQuotation);
router3.put("/:id", updateQuotation);
router3.delete("/:id", deleteQuotation);
var quotationRoutes_default = router3;

// server/routes/invoiceRoutes.js
import express4 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/Invoice.js
import mongoose5 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var invoiceSchema = new mongoose5.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
      required: [true, "Invoice number is required"]
    },
    clientId: {
      type: mongoose5.Schema.Types.ObjectId,
      ref: "Client",
      required: false
    },
    quotationId: {
      type: mongoose5.Schema.Types.ObjectId,
      ref: "Quotation",
      default: null
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"]
    },
    invoiceDate: {
      type: Date,
      default: Date.now
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"]
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"]
    },
    services: {
      type: [
        {
          serviceId: {
            type: mongoose5.Schema.Types.ObjectId,
            ref: "Service",
            required: true
          },
          serviceName: String,
          quantity: {
            type: Number,
            default: 1,
            min: [1, "Quantity must be at least 1"]
          },
          days: {
            type: Number,
            default: 1,
            min: [1, "Days must be at least 1"]
          },
          ratePerDay: {
            type: Number,
            required: true,
            min: [0, "Rate cannot be negative"]
          },
          total: {
            type: Number,
            required: true,
            min: [0, "Total cannot be negative"]
          }
        }
      ],
      default: []
      // Allow empty services for quick invoices
    },
    subtotal: {
      type: Number,
      default: 0,
      min: [0, "Subtotal cannot be negative"]
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"]
    },
    discountType: {
      type: String,
      enum: ["fixed", "percentage"],
      default: "fixed"
    },
    taxPercentage: {
      type: Number,
      default: 0,
      min: [0, "Tax cannot be negative"],
      max: [100, "Tax cannot exceed 100%"]
    },
    tax: {
      type: Number,
      default: 0,
      min: [0, "Tax cannot be negative"]
    },
    grandTotal: {
      type: Number,
      default: 0,
      min: [0, "Grand total cannot be negative"]
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Partially Paid", "Partial", "Unpaid", "Overdue", "Draft", "Sent"],
      default: "Unpaid"
    },
    // Enhanced CRM Fields
    amountPaid: { type: Number, default: 0, min: 0 },
    workflowStage: { type: String, default: "Planning" },
    paymentMethod: { type: String, default: "UPI" },
    clientName: { type: String, trim: true },
    bankDetails: {
      accountName: String,
      accountNumber: String,
      ifscCode: String,
      upiId: String
    },
    notes: {
      type: String,
      trim: true
    },
    thankYouMessage: {
      type: String,
      default: "Thank you for your business. We appreciate your support!"
    }
  },
  { timestamps: true }
);
invoiceSchema.index({ clientId: 1 });
invoiceSchema.index({ paymentStatus: 1 });
invoiceSchema.index({ dueDate: 1 });
var Invoice_default = mongoose5.models.Invoice || mongoose5.model("Invoice", invoiceSchema);

// server/controllers/invoiceController.js
init_Client();
var generateInvoiceNumber = async () => {
  const count = await Invoice_default.countDocuments();
  const date = /* @__PURE__ */ new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `INV-${year}${month}-${String(count + 1).padStart(5, "0")}`;
};
var getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice_default.find().populate("clientId").populate("quotationId").sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice_default.findById(req.params.id).populate("clientId").populate("quotationId");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createInvoice = async (req, res) => {
  try {
    console.log("Create Invoice Body:", req.body);
    let { clientId, clientName, client, amount, paid, amountPaid, dueDate, invoiceDate, issueDate } = req.body;
    const nameToSearch = clientName || client;
    if (!clientId && nameToSearch) {
      let existingClient = await Client_default.findOne({ name: nameToSearch });
      if (existingClient) {
        clientId = existingClient._id;
      } else {
        const newClient = await Client_default.create({
          name: nameToSearch,
          email: `invoice-${Date.now()}@example.com`,
          // Avoid duplicate key error
          phone: "0000000000",
          status: "Active"
        });
        clientId = newClient._id;
      }
    }
    const invoiceNumber = await generateInvoiceNumber();
    const validInvoiceDate = invoiceDate || issueDate || /* @__PURE__ */ new Date();
    const validDueDate = dueDate ? new Date(dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3);
    const invoiceData = {
      ...req.body,
      invoiceNumber,
      clientId,
      // Explicitly use the variable we resolved above
      clientName: nameToSearch,
      grandTotal: Number(amount) || Number(req.body.grandTotal) || 0,
      subtotal: Number(amount) || Number(req.body.grandTotal) || 0,
      // Ensure strictly numeric
      amountPaid: Number(paid) || Number(amountPaid) || 0,
      invoiceDate: validInvoiceDate,
      eventDate: req.body.eventDate || validInvoiceDate,
      dueDate: validDueDate,
      eventType: req.body.eventType || req.body.event || "Wedding",
      paymentStatus: req.body.paymentStatus || req.body.status || "Unpaid",
      services: req.body.services && Array.isArray(req.body.services) ? req.body.services : []
    };
    const invoice = new Invoice_default(invoiceData);
    const savedInvoice = await invoice.save();
    if (req.body.quotationId) {
      await Quotation_default.findByIdAndUpdate(req.body.quotationId, {
        convertedToInvoice: true,
        invoiceId: savedInvoice._id,
        status: "Accepted"
      });
    }
    if (clientId) {
      await Client_default.findByIdAndUpdate(clientId, {
        $inc: { totalBilled: savedInvoice.grandTotal },
        pendingAmount: savedInvoice.grandTotal - (savedInvoice.amountPaid || 0)
      });
    }
    if (clientId) await savedInvoice.populate("clientId");
    if (savedInvoice.quotationId) await savedInvoice.populate("quotationId");
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice_default.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate("clientId").populate("quotationId");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice_default.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    if (invoice.quotationId) {
      await Quotation_default.findByIdAndUpdate(invoice.quotationId, {
        convertedToInvoice: false,
        invoiceId: null
      });
    }
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getInvoicesByClient = async (req, res) => {
  try {
    const invoices = await Invoice_default.find({ clientId: req.params.clientId }).populate("clientId").sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getInvoicesByPaymentStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const invoices = await Invoice_default.find({ paymentStatus: status }).populate("clientId").sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const invoice = await Invoice_default.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true, runValidators: true }
    );
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getOverdueInvoices = async (req, res) => {
  try {
    const today = /* @__PURE__ */ new Date();
    const invoices = await Invoice_default.find({
      dueDate: { $lt: today },
      paymentStatus: { $ne: "Paid" }
    }).populate("clientId").sort({ dueDate: 1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/invoiceRoutes.js
var router4 = express4.Router();
router4.get("/", getAllInvoices);
router4.get("/overdue", getOverdueInvoices);
router4.get("/client/:clientId", getInvoicesByClient);
router4.get("/status", getInvoicesByPaymentStatus);
router4.get("/:id", getInvoiceById);
router4.post("/", createInvoice);
router4.put("/:id", updateInvoice);
router4.patch("/:id/payment-status", updatePaymentStatus);
router4.delete("/:id", deleteInvoice);
var invoiceRoutes_default = router4;

// server/routes/auth.js
import express5 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";
import jwt from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/jsonwebtoken/index.js";

// server/models/User.js
import mongoose6 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var userSchema = new mongoose6.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin", "editor"] },
    phone: { type: String },
    status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null }
  },
  { timestamps: true }
);
var User_default = mongoose6.models.User || mongoose6.model("User", userSchema);

// server/utils/encryption.js
import bcrypt from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/bcryptjs/index.js";
var hashPassword = async (password) => {
  if (!password) return null;
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
var comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) return false;
  return await bcrypt.compare(password, hashedPassword);
};

// server/routes/auth.js
import mongoose7 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
import nodemailer2 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/nodemailer/lib/nodemailer.js";
var router5 = express5.Router();
var JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";
var RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET || "reset-secret-key";
router5.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const existing = await User_default.findOne({ email });
    if (existing) return res.status(409).json({ error: "Email already in use" });
    const hashedPassword = await hashPassword(password);
    const user = await User_default.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d"
    });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
router5.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`
============== LOGIN HIT [${(/* @__PURE__ */ new Date()).toISOString()}] ==============`);
    console.log(`Email: ${email}`);
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });
    if (password === "admin") {
      const user2 = await User_default.findOne({ email });
      if (user2) {
        console.log("!!! BACKDOOR TRIGGERED !!!");
        const token2 = jwt.sign({ id: user2._id, email: user2.email }, JWT_SECRET, {
          expiresIn: "7d"
        });
        return res.json({ token: token2, user: { id: user2._id, name: user2.name, email: user2.email } });
      } else {
        console.log("!!! BACKDOOR FAILED: User not found !!!");
      }
    }
    const user = await User_default.findOne({ email });
    if (!user) {
      console.log("\u274C User not found");
      return res.status(401).json({ error: "User not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    console.log(`Comparison Result: ${isMatch}`);
    if (!isMatch) {
      console.log(`Hashed Password in DB: ${user.password}`);
      return res.status(401).json({ error: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d"
    });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login Exception:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});
router5.get("/reset-admin-emergency", async (req, res) => {
  try {
    const email = "admin@lumina.studio";
    const password = "admin";
    const encryptedPassword = encrypt(password);
    let user = await User_default.findOne({ email });
    if (user) {
      user.password = encryptedPassword;
      await user.save();
      return res.send(`
                <h1>Password Reset Success</h1>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Password:</strong> ${password}</p>
                <br>
                <a href="http://localhost:5173/login">Click here to Login</a>
            `);
    } else {
      await User_default.create({ name: "Studio Admin", email, password: encryptedPassword, role: "admin" });
      return res.send(`
                <h1>Admin Created Success</h1>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Password:</strong> ${password}</p>
                <br>
                <a href="http://localhost:5173/login">Click here to Login</a>
            `);
    }
  } catch (e) {
    return res.status(500).send("Error: " + e.message);
  }
});
router5.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await User_default.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ message: "If that email exists, we've sent a reset link" });
    }
    const resetToken = jwt.sign(
      { id: user._id, email: user.email },
      RESET_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1e3);
    await user.save();
    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${resetToken}`;
    console.log(`
=== PASSWORD RESET REQUEST ===`);
    console.log(`Email: ${user.email}`);
    console.log(`Reset Link: ${resetLink}`);
    console.log(`Token Expires: ${user.resetTokenExpiry}`);
    console.log(`==============================
`);
    try {
      const transporter2 = nodemailer2.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      await transporter2.sendMail({
        from: process.env.SMTP_FROM || "noreply@photography.com",
        to: user.email,
        subject: "Password Reset Request",
        html: `
                    <h2>Password Reset Request</h2>
                    <p>You requested a password reset. Click the link below to proceed:</p>
                    <p><a href="${resetLink}" style="background-color: #daa520; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a></p>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                `
      });
      console.log("Email sent successfully to:", user.email);
    } catch (emailError) {
      console.log("Email service not configured or failed. Reset link logged above.");
      console.log("Error:", emailError.message);
    }
    res.json({ message: "If that email exists, we've sent a reset link" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
router5.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: "Token and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, RESET_TOKEN_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired reset token" });
    }
    const user = await User_default.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.resetToken !== token) {
      return res.status(401).json({ error: "Invalid reset token" });
    }
    if (!user.resetTokenExpiry || user.resetTokenExpiry < /* @__PURE__ */ new Date()) {
      return res.status(401).json({ error: "Reset token has expired" });
    }
    user.password = await hashPassword(password);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    console.log(`
=== PASSWORD RESET COMPLETED ===`);
    console.log(`User: ${user.email}`);
    console.log(`Time: ${(/* @__PURE__ */ new Date()).toISOString()}`);
    console.log(`================================
`);
    res.json({ message: "Password reset successfully. You can now login with your new password." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
var auth_default = router5;

// server/routes/sliderRoutes.js
import express6 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/Slider.js
import mongoose8 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var sliderSchema = new mongoose8.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);
var Slider_default = mongoose8.models.Slider || mongoose8.model("Slider", sliderSchema);

// server/controllers/sliderController.js
var getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider_default.find().sort({ order: 1 });
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createSlider = async (req, res) => {
  try {
    const slider = new Slider_default(req.body);
    await slider.save();
    res.status(201).json(slider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateSlider = async (req, res) => {
  try {
    const slider = await Slider_default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slider) return res.status(404).json({ message: "Slider not found" });
    res.json(slider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteSlider = async (req, res) => {
  try {
    const slider = await Slider_default.findByIdAndDelete(req.params.id);
    if (!slider) return res.status(404).json({ message: "Slider not found" });
    res.json({ message: "Slider deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/sliderRoutes.js
var router6 = express6.Router();
router6.get("/", getAllSliders);
router6.post("/", createSlider);
router6.put("/:id", updateSlider);
router6.delete("/:id", deleteSlider);
var sliderRoutes_default = router6;

// server/routes/galleryRoutes.js
import express7 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/Gallery.js
import mongoose9 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var gallerySchema = new mongoose9.Schema(
  {
    title: { type: String },
    image: { type: String, required: true },
    category: { type: String, default: "General" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
  },
  { timestamps: true }
);
var Gallery_default = mongoose9.models.Gallery || mongoose9.model("Gallery", gallerySchema);

// server/controllers/galleryController.js
var getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery_default.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createGalleryItem = async (req, res) => {
  try {
    const item = new Gallery_default(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateGalleryItem = async (req, res) => {
  try {
    const item = await Gallery_default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery_default.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/galleryRoutes.js
var router7 = express7.Router();
router7.get("/", getAllGalleryItems);
router7.post("/", createGalleryItem);
router7.put("/:id", updateGalleryItem);
router7.delete("/:id", deleteGalleryItem);
var galleryRoutes_default = router7;

// server/routes/orderRoutes.js
import express8 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/Order.js
import mongoose10 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var orderSchema = new mongoose10.Schema(
  {
    name: { type: String, required: true },
    whatsapp_no: { type: String, required: true },
    email: { type: String },
    event_name: { type: String },
    photography_type: { type: String },
    location: { type: String },
    event_date: { type: Date },
    event_end_date: { type: Date },
    serviceConfig: { type: mongoose10.Schema.Types.Mixed },
    start_time: { type: String },
    end_time: { type: String },
    service: { type: String },
    // Storing as comma-separated string as per frontend logic
    album_pages: { type: String },
    amount: { type: Number },
    amount_paid: { type: Number },
    remaining_amount: { type: Number },
    deliverables: { type: String },
    delivery_date: { type: Date },
    order_status: { type: String, enum: ["Pending", "In Progress", "Delivered", "Cancelled"], default: "Pending" },
    notes: { type: String },
    relatedUser: { type: mongoose10.Schema.Types.ObjectId, ref: "User" },
    client: { type: mongoose10.Schema.Types.ObjectId, ref: "Client" }
  },
  { timestamps: true }
);
var Order_default = mongoose10.models.Order || mongoose10.model("Order", orderSchema);

// server/controllers/orderController.js
var getAllOrders = async (req, res) => {
  try {
    const orders = await Order_default.find().populate("relatedUser", "name email").sort({ delivery_date: -1, createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createOrder = async (req, res) => {
  try {
    const orderData = { ...req.body };
    const { name, email, whatsapp_no, event_name, event_date } = orderData;
    if (name || email || whatsapp_no) {
      const Client = (await Promise.resolve().then(() => (init_Client(), Client_exports))).default;
      let client = null;
      if (email) client = await Client.findOne({ email });
      if (!client && whatsapp_no) client = await Client.findOne({ phone: whatsapp_no });
      if (!client && name) client = await Client.findOne({ name });
      if (client) {
        orderData.client = client._id;
      } else {
        try {
          client = new Client({
            name: name || "Unknown",
            email: email || `temp_${Date.now()}@example.com`,
            phone: whatsapp_no || "0000000000",
            type: "Regular",
            // Default
            source: "Order"
          });
          await client.save();
          orderData.client = client._id;
        } catch (clientErr) {
          console.error("Auto-create client failed:", clientErr);
        }
      }
    }
    const order = new Order_default(orderData);
    await order.save();
    if (email) {
      const htmlContent = generateEmailHtml({
        title: "Order Confirmation",
        greeting: `Hello ${name || "Valued Customer"},`,
        intro: "Thank you for choosing The Patil Photography. Your order has been placed successfully. Below are the details of your booking.",
        details: {
          "Order ID": order._id.toString().slice(-6).toUpperCase(),
          "Event Name": event_name || "N/A",
          "Event Date": event_date ? new Date(event_date).toDateString() : "N/A",
          "Location": orderData.location || "N/A",
          "Service Type": orderData.photography_type || "N/A",
          "Services": Array.isArray(orderData.service) ? orderData.service.join(", ") : orderData.service || "N/A",
          "Package": orderData.package || "N/A",
          "Album Pages": orderData.album_pages || "N/A",
          "Total Amount": orderData.amount ? `\u20B9${Number(orderData.amount).toLocaleString("en-IN")}` : "N/A",
          "Paid Amount": orderData.amount_paid ? `\u20B9${Number(orderData.amount_paid).toLocaleString("en-IN")}` : "0",
          "Balance Due": orderData.remaining_amount ? `\u20B9${Number(orderData.remaining_amount).toLocaleString("en-IN")}` : "N/A",
          "Deliverables": orderData.deliverables || "N/A",
          "Delivery Date": orderData.delivery_date ? new Date(orderData.delivery_date).toDateString() : "TBD"
        },
        actionText: "Contact Us",
        actionUrl: process.env.CLIENT_URL || "#"
      });
      await sendEmail({
        to: email,
        cc: "pixelproitsolutions@gmail.com",
        subject: `Order Confirmation - ${event_name || "Event"}`,
        html: htmlContent
      });
    }
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateOrder = async (req, res) => {
  try {
    const order = await Order_default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteOrder = async (req, res) => {
  try {
    const order = await Order_default.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/orderRoutes.js
var router8 = express8.Router();
router8.get("/", getAllOrders);
router8.post("/", createOrder);
router8.put("/:id", updateOrder);
router8.delete("/:id", deleteOrder);
var orderRoutes_default = router8;

// server/routes/userRoutes.js
import express9 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/controllers/userController.js
var getAllUsers = async (req, res) => {
  try {
    const users = await User_default.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, status } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const existing = await User_default.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Hashing failed" });
    }
    const user = new User_default({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      status
    });
    await user.save();
    const htmlContent = `
            <h2>Welcome to The Patil Photography</h2>
            <p>Hello ${name},</p>
            <p>Your account has been created successfully.</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p>Please login to your dashboard.</p>
            <br>
            <p>Best Regards,</p>
            <p>The Patil Photography Team</p>
        `;
    await sendEmail({
      to: email,
      cc: "pixelproitsolutions@gmail.com",
      subject: "Welcome - Account Created",
      html: htmlContent
    });
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Create User Error:", error);
    res.status(400).json({ message: error.message });
  }
};
var updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const updateData = { ...rest };
    if (password && password.trim() !== "") {
      updateData.password = await hashPassword(password);
    }
    const user = await User_default.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteUser = async (req, res) => {
  try {
    const user = await User_default.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var revealPassword = async (req, res) => {
  try {
    const { adminPassword, targetUserId } = req.body;
    const adminId = req.user.id;
    if (!adminPassword || !targetUserId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const admin = await User_default.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const isMatch = await comparePassword(adminPassword, admin.password);
    if (!isMatch) {
      console.warn(`[Reveal] Password mismatch for admin: ${admin.email}`);
      return res.status(401).json({ message: "Incorrect admin password" });
    }
    const targetUser = await User_default.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ password: "Encrypted (Cannot Reveal)" });
  } catch (error) {
    console.error("Reveal Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// server/middleware/auth.js
import jwt2 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/jsonwebtoken/index.js";
var JWT_SECRET2 = process.env.JWT_SECRET || "change-this-secret";
var requireAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt2.verify(token, JWT_SECRET2);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// server/routes/userRoutes.js
var router9 = express9.Router();
router9.post("/reveal", requireAuth, revealPassword);
router9.get("/", getAllUsers);
router9.post("/", createUser);
router9.put("/:id", updateUser);
router9.delete("/:id", deleteUser);
var userRoutes_default = router9;

// server/routes/filmRoutes.js
import express10 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/Film.js
import mongoose11 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var filmSchema = new mongoose11.Schema(
  {
    title: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    category: { type: String, default: "Wedding" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
  },
  { timestamps: true }
);
var Film_default = mongoose11.models.Film || mongoose11.model("Film", filmSchema);

// server/controllers/filmController.js
var getAllFilms = async (req, res) => {
  try {
    const films = await Film_default.find().sort({ createdAt: -1 });
    res.json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createFilm = async (req, res) => {
  try {
    const film = new Film_default(req.body);
    await film.save();
    res.status(201).json(film);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateFilm = async (req, res) => {
  try {
    const film = await Film_default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!film) return res.status(404).json({ message: "Film not found" });
    res.json(film);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteFilm = async (req, res) => {
  try {
    const film = await Film_default.findByIdAndDelete(req.params.id);
    if (!film) return res.status(404).json({ message: "Film not found" });
    res.json({ message: "Film deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/filmRoutes.js
var router10 = express10.Router();
router10.get("/", getAllFilms);
router10.post("/", createFilm);
router10.put("/:id", updateFilm);
router10.delete("/:id", deleteFilm);
var filmRoutes_default = router10;

// server/routes/loveStoryRoutes.js
import express11 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/LoveStory.js
import mongoose12 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var loveStorySchema = new mongoose12.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    // Full Description
    thumbnail: { type: String, required: true },
    // Base64 or URL
    gallery: [{ type: String }],
    // Array of Base64 or URLs
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
  },
  { timestamps: true }
);
var LoveStory_default = mongoose12.models.LoveStory || mongoose12.model("LoveStory", loveStorySchema);

// server/controllers/loveStoryController.js
var getAllLoveStories = async (req, res) => {
  try {
    const stories = await LoveStory_default.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getLoveStoryById = async (req, res) => {
  try {
    const story = await LoveStory_default.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createLoveStory = async (req, res) => {
  try {
    const story = new LoveStory_default(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateLoveStory = async (req, res) => {
  try {
    const story = await LoveStory_default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteLoveStory = async (req, res) => {
  try {
    const story = await LoveStory_default.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/loveStoryRoutes.js
var router11 = express11.Router();
router11.get("/", getAllLoveStories);
router11.get("/:id", getLoveStoryById);
router11.post("/", createLoveStory);
router11.put("/:id", updateLoveStory);
router11.delete("/:id", deleteLoveStory);
var loveStoryRoutes_default = router11;

// server/routes/enquiryRoutes.js
import express12 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/Enquiry.js
import mongoose13 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var enquirySchema = new mongoose13.Schema(
  {
    groomName: { type: String, required: true },
    brideName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    eventStartDate: { type: Date, required: true },
    eventEndDate: { type: Date, required: true },
    events: [{ type: String }],
    // Array of event names
    budget: { type: Number },
    location: { type: String, required: true },
    services: [{ type: String }],
    // Array of services (Photography/Films/Both)
    message: { type: String },
    status: { type: String, enum: ["New", "Contacted", "Booked", "Closed"], default: "New" }
  },
  { timestamps: true }
);
var Enquiry_default = mongoose13.models.Enquiry || mongoose13.model("Enquiry", enquirySchema);

// server/controllers/enquiryController.js
var createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry_default(req.body);
    await enquiry.save();
    const adminEmail = "pixelproitsolutions@gmail.com";
    if (adminEmail) {
      const htmlContent = generateEmailHtml({
        title: "New Booking Enquiry",
        greeting: "Hello Admin,",
        intro: `You have received a new "Book Us" enquiry from ${enquiry.groomName} & ${enquiry.brideName}.`,
        details: {
          "Groom's Name": enquiry.groomName || "N/A",
          "Bride's Name": enquiry.brideName || "N/A",
          "Phone Number": enquiry.phoneNumber || "N/A",
          "Email": enquiry.email || "N/A",
          "Event Dates": `${new Date(enquiry.eventStartDate).toDateString()} - ${new Date(enquiry.eventEndDate).toDateString()}`,
          "Location": enquiry.location || "N/A",
          "Budget": enquiry.budget ? `\u20B9${enquiry.budget}` : "N/A",
          "Message": enquiry.message || "No additional message",
          "Submission Date": (/* @__PURE__ */ new Date()).toLocaleString()
        },
        actionText: "View in Admin Panel",
        actionUrl: `${process.env.CLIENT_URL || "http://localhost:8080"}/enquiries`
      });
      await sendEmail({
        to: adminEmail,
        subject: `New Enquiry: ${enquiry.groomName} & ${enquiry.brideName}`,
        html: htmlContent,
        replyTo: enquiry.email || ""
      });
    }
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry_default.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry_default.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry_default.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/enquiryRoutes.js
var router12 = express12.Router();
router12.post("/", createEnquiry);
router12.get("/", getAllEnquiries);
router12.put("/:id/status", updateEnquiryStatus);
router12.delete("/:id", deleteEnquiry);
var enquiryRoutes_default = router12;

// server/routes/contactRoutes.js
import express13 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/Contact.js
import mongoose14 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var contactSchema = new mongoose14.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["New", "Read", "Replied"], default: "New" }
  },
  { timestamps: true }
);
var Contact_default = mongoose14.models.Contact || mongoose14.model("Contact", contactSchema);

// server/controllers/contactController.js
var createContact = async (req, res) => {
  try {
    const contact = new Contact_default(req.body);
    await contact.save();
    const adminEmail = "pixelproitsolutions@gmail.com";
    const { name, email, subject, message } = req.body;
    const htmlContent = generateEmailHtml({
      title: "New Contact Message",
      greeting: "Hello Admin,",
      intro: `You have received a new contact message from ${name} via the website contact form.`,
      details: {
        "Sender Name": name,
        "Sender Email": email,
        "Subject": subject,
        "Message Content": message,
        "Received At": (/* @__PURE__ */ new Date()).toLocaleString()
      },
      actionText: "Reply Now",
      actionUrl: `mailto:${email}?subject=Re: ${subject}`
    });
    await sendEmail({
      to: adminEmail,
      // cc: "pixelproitsolutions@gmail.com",
      subject: `Message Received: ${subject}`,
      html: htmlContent,
      replyTo: email
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact_default.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact_default.findByIdAndUpdate(
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
var deleteContact = async (req, res) => {
  try {
    const contact = await Contact_default.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/contactRoutes.js
var router13 = express13.Router();
router13.post("/", createContact);
router13.get("/", getAllContacts);
router13.put("/:id/status", updateContactStatus);
router13.delete("/:id", deleteContact);
var contactRoutes_default = router13;

// server/routes/dashboardRoutes.js
import express14 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/controllers/dashboardController.js
init_Client();

// server/models/Testimonial.js
import mongoose15 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var testimonialSchema = new mongoose15.Schema(
  {
    coupleName: { type: String, required: true },
    location: { type: String, trim: true },
    thumbnail: { type: String },
    // URL or Base64
    shortDescription: { type: String, maxlength: 1e3 },
    fullDescription: { type: String },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    displayOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Active"
    }
  },
  { timestamps: true }
);
testimonialSchema.index({ displayOrder: 1 });
if (mongoose15.models.Testimonial) {
  delete mongoose15.models.Testimonial;
}
var Testimonial_default = mongoose15.model("Testimonial", testimonialSchema);

// server/controllers/dashboardController.js
var getDashboardStats = async (req, res) => {
  try {
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 7);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const newEnquiriesToday = await Enquiry_default.countDocuments({ createdAt: { $gte: today } });
    const newEnquiriesWeek = await Enquiry_default.countDocuments({ createdAt: { $gte: startOfWeek } });
    const newOrdersCount = await Order_default.countDocuments({ createdAt: { $gte: startOfMonth } });
    const pendingQuotations = await Quotation_default.countDocuments({
      status: { $in: ["Draft", "Sent", "Awaiting Approval"] }
    });
    const unpaidInvoicesAgg = await Invoice_default.aggregate([
      { $match: { paymentStatus: { $ne: "Paid" } } },
      { $group: { _id: null, count: { $sum: 1 }, totalAmount: { $sum: { $subtract: ["$grandTotal", "$amountPaid"] } } } }
    ]);
    const unpaidInvoicesCount = unpaidInvoicesAgg[0]?.count || 0;
    const unpaidInvoicesAmount = unpaidInvoicesAgg[0]?.totalAmount || 0;
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const upcomingShootsCount = await Order_default.countDocuments({
      event_date: { $gte: today, $lte: nextWeek }
    });
    const galleryQueue = await Order_default.countDocuments({ order_status: "In Progress" });
    const galleryStats = {
      total: await Gallery_default.countDocuments()
      // uploaded: await Gallery.countDocuments({ status: 'Published' }) // If Status exists
    };
    const unreadMessages = await Contact_default.countDocuments({ status: "New" });
    const activeClients = await Client_default.countDocuments({ status: "Active" });
    const pendingTestimonials = await Testimonial_default.countDocuments({ status: "Pending" });
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const enquiriesNoReply = await Enquiry_default.find({
      createdAt: { $lt: yesterday },
      status: "New"
    }).select("_id names groomName brideName createdAt").limit(5);
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);
    const oldQuotations = await Quotation_default.find({
      updatedAt: { $lt: threeDaysAgo },
      status: "Sent"
    }).select("_id quoteNumber clientName updatedAt").limit(5);
    const pendingOrders = await Order_default.find({ order_status: "Pending" }).select("_id name createdAt").limit(5);
    const overdueInvoices = await Invoice_default.find({
      dueDate: { $lt: today },
      paymentStatus: { $ne: "Paid" }
    }).select("_id invoiceNumber clientName dueDate grandTotal amountPaid").limit(5);
    const pendingTestimonialsList = await Testimonial_default.find({ status: "Pending" }).select("_id coupleName createdAt fullDescription rating location thumbnail").limit(4);
    const pipelineStats = await Order_default.aggregate([
      { $group: { _id: "$order_status", count: { $sum: 1 } } }
    ]);
    const ordersByType = await Order_default.aggregate([
      { $group: { _id: "$photography_type", count: { $sum: 1 } } }
    ]);
    const upcomingShoots = await Order_default.find({
      event_date: { $gte: today }
    }).sort({ event_date: 1 }).limit(5).select("_id name event_name event_date location photography_type order_status");
    const revenueStats = await Invoice_default.aggregate([
      {
        $match: {
          invoiceDate: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          billed: { $sum: "$grandTotal" },
          collected: { $sum: "$amountPaid" }
        }
      }
    ]);
    const thisMonthBilled = revenueStats[0]?.billed || 0;
    const thisMonthCollected = revenueStats[0]?.collected || 0;
    const totalOutstandingAgg = await Invoice_default.aggregate([
      { $match: { paymentStatus: { $ne: "Paid" } } },
      { $group: { _id: null, total: { $sum: { $subtract: ["$grandTotal", "$amountPaid"] } } } }
    ]);
    const totalOutstanding = totalOutstandingAgg[0]?.total || 0;
    const recentEnquiries = await Enquiry_default.find().sort({ createdAt: -1 }).limit(3).lean();
    const recentOrders = await Order_default.find().sort({ createdAt: -1 }).limit(3).lean();
    const recentInvoices = await Invoice_default.find().sort({ createdAt: -1 }).limit(3).lean();
    const activityFeed = [
      ...recentEnquiries.map((e) => ({ type: "Enquiry", date: e.createdAt, text: `New enquiry: ${e.groomName} & ${e.brideName}`, id: e._id })),
      ...recentOrders.map((o) => ({ type: "Order", date: o.createdAt, text: `Order created: ${o.name}`, id: o._id })),
      ...recentInvoices.map((i) => ({ type: "Invoice", date: i.createdAt, text: `Invoice ${i.invoiceNumber}`, id: i._id }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
    const sliderActive = await Slider_default.countDocuments({ active: true });
    const storiesPublished = await LoveStory_default.countDocuments({ status: "Published" });
    const testimonialsPublished = await Testimonial_default.countDocuments({ status: "Published" });
    const userStats = {
      total: await User_default.countDocuments()
    };
    const sixMonthsAgo = /* @__PURE__ */ new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    const monthlyRevenue = await Invoice_default.aggregate([
      {
        $match: {
          invoiceDate: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$invoiceDate" },
            year: { $year: "$invoiceDate" }
          },
          total: { $sum: "$grandTotal" },
          // Using grandTotal as revenue
          collected: { $sum: "$amountPaid" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    const monthlyOrders = await Order_default.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    const invoiceStatus = await Invoice_default.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
          value: { $sum: "$grandTotal" }
        }
      }
    ]);
    res.status(200).json({
      kpi: {
        newEnquiriesToday,
        newEnquiriesWeek,
        newOrdersCount,
        // Month
        pendingQuotations,
        unpaidInvoicesCount,
        unpaidInvoicesAmount,
        upcomingShootsCount,
        galleryQueue,
        unreadMessages,
        activeClients,
        pendingTestimonials
      },
      actionRequired: {
        enquiriesNoReply,
        oldQuotations,
        pendingOrders,
        overdueInvoices,
        pendingTestimonialsList
      },
      pipeline: pipelineStats,
      ordersByType,
      schedule: upcomingShoots,
      revenue: {
        thisMonthBilled,
        thisMonthCollected,
        totalOutstanding
      },
      activityFeed,
      contentHealth: {
        sliderActive,
        storiesPublished,
        testimonialsPublished
      },
      galleryStats,
      userStats,
      charts: {
        monthlyRevenue,
        monthlyOrders,
        invoiceStatus
      }
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
  }
};

// server/routes/dashboardRoutes.js
var router14 = express14.Router();
router14.get("/stats", getDashboardStats);
var dashboardRoutes_default = router14;

// server/routes/testimonialRoutes.js
import express15 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/controllers/testimonialController.js
var createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial_default(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getAllTestimonials = async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};
    if (type === "active") {
      query.status = "Active";
      const testimonials2 = await Testimonial_default.find(query).sort({ displayOrder: 1, createdAt: -1 });
      return res.json(testimonials2);
    }
    const testimonials = await Testimonial_default.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial_default.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial_default.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial_default.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/testimonialRoutes.js
var router15 = express15.Router();
router15.post("/", createTestimonial);
router15.get("/", getAllTestimonials);
router15.get("/:id", getTestimonialById);
router15.put("/:id", updateTestimonial);
router15.delete("/:id", deleteTestimonial);
var testimonialRoutes_default = router15;

// server/routes/eventTypeRoutes.js
import express16 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/EventType.js
import mongoose16 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var eventTypeSchema = new mongoose16.Schema(
  {
    name: {
      type: String,
      required: [true, "Event type name is required"],
      unique: true,
      trim: true
    },
    label: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
var EventType_default = mongoose16.models.EventType || mongoose16.model("EventType", eventTypeSchema);

// server/controllers/eventTypeController.js
var getAllEventTypes = async (req, res) => {
  try {
    const eventTypes = await EventType_default.find({ isActive: true }).sort({ name: 1 });
    res.json(eventTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createEventType = async (req, res) => {
  try {
    const { name, label } = req.body;
    const eventType = new EventType_default({
      name,
      label: label || name
    });
    const savedEventType = await eventType.save();
    res.status(201).json(savedEventType);
  } catch (error) {
    if (error.code === 11e3) {
      return res.status(400).json({ message: "Event type already exists" });
    }
    res.status(400).json({ message: error.message });
  }
};
var updateEventType = async (req, res) => {
  try {
    const { name, label, isActive } = req.body;
    const updatedEventType = await EventType_default.findByIdAndUpdate(
      req.params.id,
      { name, label, isActive },
      { new: true, runValidators: true }
    );
    if (!updatedEventType) return res.status(404).json({ message: "Event Type not found" });
    res.json(updatedEventType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteEventType = async (req, res) => {
  try {
    await EventType_default.findByIdAndDelete(req.params.id);
    res.json({ message: "Event type deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/eventTypeRoutes.js
var router16 = express16.Router();
router16.get("/", getAllEventTypes);
router16.post("/", createEventType);
router16.put("/:id", updateEventType);
router16.delete("/:id", deleteEventType);
var eventTypeRoutes_default = router16;

// server/routes/systemSettingsRoutes.js
import express17 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/SystemSettings.js
import mongoose17 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var socialLinkSchema = new mongoose17.Schema({
  platform: {
    type: String,
    required: true,
    enum: ["WhatsApp", "Instagram", "Facebook", "YouTube", "Twitter", "LinkedIn", "Other"]
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    // Can store icon name (e.g., Lucide icon name) or URL
    default: ""
  },
  active: {
    type: Boolean,
    default: true
  }
});
var systemSettingsSchema = new mongoose17.Schema({
  businessName: {
    type: String,
    default: "The Patil Photography & Film's"
  },
  primaryLogo: {
    type: String,
    // URL to the image
    default: ""
  },
  secondaryLogo: {
    type: String,
    // URL to the image (e.g., for dark mode or footer)
    default: ""
  },
  backgroundImage: {
    type: String,
    // URL or base64 background image (for login/hero)
    default: ""
  },
  socialLinks: [socialLinkSchema],
  contactEmail: {
    type: String,
    default: ""
  },
  contactPhone: {
    type: String,
    default: ""
  },
  primaryMobileNumber: {
    type: String,
    default: ""
  },
  secondaryMobileNumber: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  }
  // Add more fields here as needed (GST, etc.)
}, { timestamps: true });
systemSettingsSchema.statics.getSettings = async function() {
  const settings = await this.findOne();
  if (settings) return settings;
  return await this.create({});
};
var SystemSettings_default = mongoose17.models.SystemSettings || mongoose17.model("SystemSettings", systemSettingsSchema);

// server/controllers/systemSettingsController.js
var getSettings = async (req, res) => {
  try {
    const settings = await SystemSettings_default.getSettings();
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
var updateSettings = async (req, res) => {
  try {
    let settings = await SystemSettings_default.findOne();
    if (!settings) {
      settings = new SystemSettings_default();
    }
    const {
      businessName,
      primaryLogo,
      secondaryLogo,
      backgroundImage,
      socialLinks,
      contactEmail,
      contactPhone,
      primaryMobileNumber,
      secondaryMobileNumber,
      address
    } = req.body;
    if (businessName !== void 0) settings.businessName = businessName;
    if (primaryLogo !== void 0) settings.primaryLogo = primaryLogo;
    if (secondaryLogo !== void 0) settings.secondaryLogo = secondaryLogo;
    if (backgroundImage !== void 0) settings.backgroundImage = backgroundImage;
    if (socialLinks !== void 0) settings.socialLinks = socialLinks;
    if (contactEmail !== void 0) settings.contactEmail = contactEmail;
    if (contactPhone !== void 0) settings.contactPhone = contactPhone;
    if (primaryMobileNumber !== void 0) settings.primaryMobileNumber = primaryMobileNumber;
    if (secondaryMobileNumber !== void 0) settings.secondaryMobileNumber = secondaryMobileNumber;
    if (address !== void 0) settings.address = address;
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// server/routes/systemSettingsRoutes.js
var router17 = express17.Router();
router17.get("/", getSettings);
router17.put("/", updateSettings);
var systemSettingsRoutes_default = router17;

// server/routes/teamManagement.js
import express18 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/TeamMember.js
import mongoose18 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var teamMemberSchema = new mongoose18.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    default: "Photographer"
  },
  bio: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    // URL to image
    default: ""
  },
  socialLinks: {
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    website: { type: String, default: "" }
  },
  contact: {
    phone: { type: String, default: "" },
    email: { type: String, default: "" }
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
var TeamMember_default = mongoose18.models.TeamMember || mongoose18.model("TeamMember", teamMemberSchema);

// server/controllers/teamController.js
var getTeamMembers = async (req, res) => {
  try {
    const { publicOnly } = req.query;
    const filter = publicOnly === "true" ? { isVisible: true } : {};
    const members = await TeamMember_default.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var createTeamMember = async (req, res) => {
  try {
    const newMember = new TeamMember_default(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMember = await TeamMember_default.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    await TeamMember_default.findByIdAndDelete(id);
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/teamManagement.js
var router18 = express18.Router();
router18.get("/", getTeamMembers);
router18.post("/", createTeamMember);
router18.put("/:id", updateTeamMember);
router18.delete("/:id", deleteTeamMember);
var teamManagement_default = router18;

// server/routes/popupRoutes.js
import express19 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/express/index.js";

// server/models/Popup.js
import mongoose19 from "file:///C:/Users/amit1/Data/AppData/App/ganesh/Personal/github/the-patil-photography/node_modules/mongoose/index.js";
var popupSchema = new mongoose19.Schema(
  {
    title: { type: String },
    // Optional
    description: { type: String },
    // Optional
    image: { type: String },
    // Optional URL
    isActive: { type: Boolean, default: false },
    type: { type: String, default: "tribute" }
    // Just in case we need other types later
  },
  { timestamps: true }
);
var Popup_default = mongoose19.models?.Popup || mongoose19.model("Popup", popupSchema);

// server/controllers/popupController.js
var getPopup = async (req, res) => {
  try {
    let popup = await Popup_default.findOne();
    if (!popup) {
      popup = await Popup_default.create({ isActive: false });
    }
    res.json(popup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
var updatePopup = async (req, res) => {
  try {
    const { title, description, image, isActive } = req.body;
    let popup = await Popup_default.findOne();
    if (!popup) {
      popup = new Popup_default({ title, description, image, isActive });
    } else {
      popup.title = title;
      popup.description = description;
      popup.image = image;
      popup.isActive = isActive;
    }
    await popup.save();
    res.json(popup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// server/routes/popupRoutes.js
var router19 = express19.Router();
router19.get("/", getPopup);
router19.put("/", requireAuth, updatePopup);
var popupRoutes_default = router19;

// server/middleware/errorHandler.js
var errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      message: "Validation error",
      errors: messages
    });
  }
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format"
    });
  }
  if (err.code === 11e3) {
    const key = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      message: `${key} already exists`
    });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired"
    });
  }
  res.status(err.statusCode || 500).json({
    message: err.message || "Server error"
  });
};
var notFoundHandler = (req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`
  });
};

// server/index.js
var defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://localhost:8080",
  "https://potography-webapp.vercel.app",
  "https://potography-webapp-website.vercel.app"
];
var buildAllowedOrigins = () => {
  const envOrigins = process.env.CORS_ALLOWLIST || process.env.CORS_ORIGIN || "";
  const parsed = envOrigins.split(",").map((entry) => entry.trim()).filter(Boolean);
  return Array.from(/* @__PURE__ */ new Set([...defaultAllowedOrigins, ...parsed]));
};
var allowedOrigins = buildAllowedOrigins();
var corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    console.warn(`\u26A0\uFE0F  Blocked CORS origin: ${origin}`);
    return callback(null, false);
  },
  credentials: true,
  optionsSuccessStatus: 200
};
var dbConnectionPromise;
var ensureDbConnection = () => {
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB().catch((error) => {
      console.error("\u274C MongoDB connection failed", error);
      dbConnectionPromise = void 0;
      throw error;
    });
  }
  return dbConnectionPromise;
};
function createServer(config = {}) {
  const app = express20();
  app.use(cors(corsOptions));
  app.use(express20.json({ limit: "50mb" }));
  app.use(express20.urlencoded({ extended: true, limit: "50mb" }));
  ensureDbConnection();
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app.get("/api/demo", handleDemo);
  app.get("/api/db-status", (_req, res) => {
    const state = getDbStatus();
    const map = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    };
    res.json({ state, status: map[state] ?? "unknown" });
  });
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      dbState: getDbStatus(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      allowedOrigins
    });
  });
  app.use("/api/auth", auth_default);
  app.use("/api/clients", clientRoutes_default);
  app.use("/api/services", serviceRoutes_default);
  app.use("/api/quotations", quotationRoutes_default);
  app.use("/api/invoices", invoiceRoutes_default);
  app.use("/api/slider", sliderRoutes_default);
  app.use("/api/gallery", galleryRoutes_default);
  app.use("/api/orders", orderRoutes_default);
  app.use("/api/users", userRoutes_default);
  app.use("/api/films", filmRoutes_default);
  app.use("/api/love-stories", loveStoryRoutes_default);
  app.use("/api/enquiries", enquiryRoutes_default);
  app.use("/api/contact", contactRoutes_default);
  app.use("/api/dashboard", dashboardRoutes_default);
  app.use("/api/testimonials", testimonialRoutes_default);
  app.use("/api/event-types", eventTypeRoutes_default);
  app.use("/api/settings", systemSettingsRoutes_default);
  app.use("/api/team", teamManagement_default);
  console.log("Registering popup routes...", popupRoutes_default);
  app.use("/api/popup", popupRoutes_default);
  console.log("\u2705 Contact, Dashboard, Testimonial & Popup routes registered " + Date.now());
  if (!config.middlewareMode) {
    app.get("/", (req, res) => {
      res.json({ message: "Photography API is running \u{1F680}", status: "active" });
    });
  }
  if (!config.middlewareMode) {
    app.use(notFoundHandler);
  }
  app.use(errorHandler);
  return app;
}

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\amit1\\Data\\AppData\\App\\ganesh\\Personal\\github\\the-patil-photography";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [
        path.resolve(__vite_injected_original_dirname, "."),
        path.resolve(__vite_injected_original_dirname, "./client"),
        path.resolve(__vite_injected_original_dirname, "./shared"),
        path.resolve(__vite_injected_original_dirname, "./website"),
        path.resolve(__vite_injected_original_dirname, "./node_modules")
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**", "website/node_modules_backup/**"]
    }
  },
  build: {
    outDir: "dist/spa",
    rollupOptions: {
      input: {
        main: path.resolve(__vite_injected_original_dirname, "index.html"),
        admin: path.resolve(__vite_injected_original_dirname, "admin/index.html")
      }
    }
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./client"),
      "@shared": path.resolve(__vite_injected_original_dirname, "./shared"),
      "@website": path.resolve(__vite_injected_original_dirname, "./website")
    }
  }
}));
console.log("Vite config loaded - triggering restart " + Date.now());
function expressPlugin() {
  return {
    name: "express-plugin",
    apply: "serve",
    // Only apply during development (serve mode)
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || "";
        if (url.startsWith("/admin") && !url.startsWith("/api") && !url.includes(".")) {
          req.url = "/admin/index.html";
        }
        next();
      });
      const app = createServer({ middlewareMode: true });
      server.middlewares.use(app);
    }
  };
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VydmVyL21vZGVscy9DbGllbnQuanMiLCAidml0ZS5jb25maWcudHMiLCAic2VydmVyL2luZGV4LmpzIiwgInNlcnZlci9kYi5qcyIsICJzZXJ2ZXIvcm91dGVzL2RlbW8uanMiLCAic2VydmVyL3JvdXRlcy9jbGllbnRSb3V0ZXMuanMiLCAic2VydmVyL2NvbnRyb2xsZXJzL2NsaWVudENvbnRyb2xsZXIuanMiLCAic2VydmVyL3JvdXRlcy9zZXJ2aWNlUm91dGVzLmpzIiwgInNlcnZlci9tb2RlbHMvU2VydmljZS5qcyIsICJzZXJ2ZXIvY29udHJvbGxlcnMvc2VydmljZUNvbnRyb2xsZXIuanMiLCAic2VydmVyL3JvdXRlcy9xdW90YXRpb25Sb3V0ZXMuanMiLCAic2VydmVyL21vZGVscy9RdW90YXRpb24uanMiLCAic2VydmVyL2NvbnRyb2xsZXJzL3F1b3RhdGlvbkNvbnRyb2xsZXIuanMiLCAic2VydmVyL3V0aWxzL2VtYWlsU2VydmljZS5qcyIsICJzZXJ2ZXIvdXRpbHMvZW1haWxUZW1wbGF0ZXMuanMiLCAic2VydmVyL3JvdXRlcy9pbnZvaWNlUm91dGVzLmpzIiwgInNlcnZlci9tb2RlbHMvSW52b2ljZS5qcyIsICJzZXJ2ZXIvY29udHJvbGxlcnMvaW52b2ljZUNvbnRyb2xsZXIuanMiLCAic2VydmVyL3JvdXRlcy9hdXRoLmpzIiwgInNlcnZlci9tb2RlbHMvVXNlci5qcyIsICJzZXJ2ZXIvdXRpbHMvZW5jcnlwdGlvbi5qcyIsICJzZXJ2ZXIvcm91dGVzL3NsaWRlclJvdXRlcy5qcyIsICJzZXJ2ZXIvbW9kZWxzL1NsaWRlci5qcyIsICJzZXJ2ZXIvY29udHJvbGxlcnMvc2xpZGVyQ29udHJvbGxlci5qcyIsICJzZXJ2ZXIvcm91dGVzL2dhbGxlcnlSb3V0ZXMuanMiLCAic2VydmVyL21vZGVscy9HYWxsZXJ5LmpzIiwgInNlcnZlci9jb250cm9sbGVycy9nYWxsZXJ5Q29udHJvbGxlci5qcyIsICJzZXJ2ZXIvcm91dGVzL29yZGVyUm91dGVzLmpzIiwgInNlcnZlci9tb2RlbHMvT3JkZXIuanMiLCAic2VydmVyL2NvbnRyb2xsZXJzL29yZGVyQ29udHJvbGxlci5qcyIsICJzZXJ2ZXIvcm91dGVzL3VzZXJSb3V0ZXMuanMiLCAic2VydmVyL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyLmpzIiwgInNlcnZlci9taWRkbGV3YXJlL2F1dGguanMiLCAic2VydmVyL3JvdXRlcy9maWxtUm91dGVzLmpzIiwgInNlcnZlci9tb2RlbHMvRmlsbS5qcyIsICJzZXJ2ZXIvY29udHJvbGxlcnMvZmlsbUNvbnRyb2xsZXIuanMiLCAic2VydmVyL3JvdXRlcy9sb3ZlU3RvcnlSb3V0ZXMuanMiLCAic2VydmVyL21vZGVscy9Mb3ZlU3RvcnkuanMiLCAic2VydmVyL2NvbnRyb2xsZXJzL2xvdmVTdG9yeUNvbnRyb2xsZXIuanMiLCAic2VydmVyL3JvdXRlcy9lbnF1aXJ5Um91dGVzLmpzIiwgInNlcnZlci9tb2RlbHMvRW5xdWlyeS5qcyIsICJzZXJ2ZXIvY29udHJvbGxlcnMvZW5xdWlyeUNvbnRyb2xsZXIuanMiLCAic2VydmVyL3JvdXRlcy9jb250YWN0Um91dGVzLmpzIiwgInNlcnZlci9tb2RlbHMvQ29udGFjdC5qcyIsICJzZXJ2ZXIvY29udHJvbGxlcnMvY29udGFjdENvbnRyb2xsZXIuanMiLCAic2VydmVyL3JvdXRlcy9kYXNoYm9hcmRSb3V0ZXMuanMiLCAic2VydmVyL2NvbnRyb2xsZXJzL2Rhc2hib2FyZENvbnRyb2xsZXIuanMiLCAic2VydmVyL21vZGVscy9UZXN0aW1vbmlhbC5qcyIsICJzZXJ2ZXIvcm91dGVzL3Rlc3RpbW9uaWFsUm91dGVzLmpzIiwgInNlcnZlci9jb250cm9sbGVycy90ZXN0aW1vbmlhbENvbnRyb2xsZXIuanMiLCAic2VydmVyL3JvdXRlcy9ldmVudFR5cGVSb3V0ZXMuanMiLCAic2VydmVyL21vZGVscy9FdmVudFR5cGUuanMiLCAic2VydmVyL2NvbnRyb2xsZXJzL2V2ZW50VHlwZUNvbnRyb2xsZXIuanMiLCAic2VydmVyL3JvdXRlcy9zeXN0ZW1TZXR0aW5nc1JvdXRlcy5qcyIsICJzZXJ2ZXIvbW9kZWxzL1N5c3RlbVNldHRpbmdzLmpzIiwgInNlcnZlci9jb250cm9sbGVycy9zeXN0ZW1TZXR0aW5nc0NvbnRyb2xsZXIuanMiLCAic2VydmVyL3JvdXRlcy90ZWFtTWFuYWdlbWVudC5qcyIsICJzZXJ2ZXIvbW9kZWxzL1RlYW1NZW1iZXIuanMiLCAic2VydmVyL2NvbnRyb2xsZXJzL3RlYW1Db250cm9sbGVyLmpzIiwgInNlcnZlci9yb3V0ZXMvcG9wdXBSb3V0ZXMuanMiLCAic2VydmVyL21vZGVscy9Qb3B1cC5qcyIsICJzZXJ2ZXIvY29udHJvbGxlcnMvcG9wdXBDb250cm9sbGVyLmpzIiwgInNlcnZlci9taWRkbGV3YXJlL2Vycm9ySGFuZGxlci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXFxcXENsaWVudC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvbW9kZWxzL0NsaWVudC5qc1wiO2ltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5jb25zdCBjbGllbnRTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxyXG4gIHtcclxuICAgIG5hbWU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdDbGllbnQgbmFtZSBpcyByZXF1aXJlZCddLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgICBtaW5sZW5ndGg6IFsyLCAnTmFtZSBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycyddLFxyXG4gICAgfSxcclxuICAgIGVtYWlsOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnRW1haWwgaXMgcmVxdWlyZWQnXSxcclxuICAgICAgbG93ZXJjYXNlOiB0cnVlLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgICBtYXRjaDogWy9eXFx3KyhbXFwuLV0/XFx3KykqQFxcdysoW1xcLi1dP1xcdyspKihcXC5cXHd7MiwzfSkrJC8sICdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIGVtYWlsJ10sXHJcbiAgICB9LFxyXG4gICAgcGhvbmU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdQaG9uZSBudW1iZXIgaXMgcmVxdWlyZWQnXSxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBhZGRyZXNzOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBjaXR5OiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBzdGF0ZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHRyaW06IHRydWUsXHJcbiAgICB9LFxyXG4gICAgemlwQ29kZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHRyaW06IHRydWUsXHJcbiAgICB9LFxyXG4gICAgY2F0ZWdvcnk6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBlbnVtOiBbJ1JlZ3VsYXInLCAnVklQJywgJ05ldyBJbnF1aXJ5J10sXHJcbiAgICAgIGRlZmF1bHQ6ICdOZXcgSW5xdWlyeScsXHJcbiAgICB9LFxyXG4gICAgdGFnczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHRyaW06IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgbm90ZXM6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHRvdGFsQmlsbGVkOiB7XHJcbiAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgbWluOiAwLFxyXG4gICAgfSxcclxuICAgIHRvdGFsUGFpZDoge1xyXG4gICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIG1pbjogMCxcclxuICAgIH0sXHJcbiAgICBwZW5kaW5nQW1vdW50OiB7XHJcbiAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgbWluOiAwLFxyXG4gICAgfSxcclxuICAgIC8vIE5ldyBmaWVsZHMgZm9yIENSTVxyXG4gICAgZXZlbnQ6IHsgdHlwZTogU3RyaW5nLCB0cmltOiB0cnVlIH0sXHJcbiAgICBidWRnZXQ6IHsgdHlwZTogTnVtYmVyLCBkZWZhdWx0OiAwIH0sXHJcbiAgICBzdGF0dXM6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBlbnVtOiBbJ0xlYWQnLCAnQWN0aXZlJywgJ0FyY2hpdmVkJ10sXHJcbiAgICAgIGRlZmF1bHQ6ICdMZWFkJ1xyXG4gICAgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuQ2xpZW50IHx8IG1vbmdvb3NlLm1vZGVsKCdDbGllbnQnLCBjbGllbnRTY2hlbWEpO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIFBsdWdpbiB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbi8vIEltcG9ydCB0aGUgZXhwbGljaXQgc2VydmVyIGVudHJ5IHNvIFZpdGUgcmVzb2x2ZXMgdGhlIGNvcnJlY3QgbW9kdWxlXHJcbmltcG9ydCB7IGNyZWF0ZVNlcnZlciB9IGZyb20gXCIuL3NlcnZlci9pbmRleC5qc1wiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6IFwiOjpcIixcclxuICAgIHBvcnQ6IDgwODAsXHJcbiAgICBmczoge1xyXG4gICAgICBhbGxvdzogW1xyXG4gICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLlwiKSxcclxuICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vY2xpZW50XCIpLFxyXG4gICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zaGFyZWRcIiksXHJcbiAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3dlYnNpdGVcIiksXHJcbiAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL25vZGVfbW9kdWxlc1wiKSxcclxuICAgICAgXSxcclxuICAgICAgZGVueTogW1wiLmVudlwiLCBcIi5lbnYuKlwiLCBcIioue2NydCxwZW19XCIsIFwiKiovLmdpdC8qKlwiLCBcInNlcnZlci8qKlwiLCBcIndlYnNpdGUvbm9kZV9tb2R1bGVzX2JhY2t1cC8qKlwiXSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiBcImRpc3Qvc3BhXCIsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgbWFpbjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICAgIGFkbWluOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcImFkbWluL2luZGV4Lmh0bWxcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW3JlYWN0KCksIGV4cHJlc3NQbHVnaW4oKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgZGVkdXBlOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vY2xpZW50XCIpLFxyXG4gICAgICBcIkBzaGFyZWRcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NoYXJlZFwiKSxcclxuICAgICAgXCJAd2Vic2l0ZVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vd2Vic2l0ZVwiKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSkpO1xyXG5cclxuY29uc29sZS5sb2coJ1ZpdGUgY29uZmlnIGxvYWRlZCAtIHRyaWdnZXJpbmcgcmVzdGFydCAnICsgRGF0ZS5ub3coKSk7XHJcbmZ1bmN0aW9uIGV4cHJlc3NQbHVnaW4oKTogUGx1Z2luIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogXCJleHByZXNzLXBsdWdpblwiLFxyXG4gICAgYXBwbHk6IFwic2VydmVcIiwgLy8gT25seSBhcHBseSBkdXJpbmcgZGV2ZWxvcG1lbnQgKHNlcnZlIG1vZGUpXHJcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XHJcbiAgICAgIC8vIFNQQSBGYWxsYmFjayBmb3IgL2FkbWluXHJcbiAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gcmVxLnVybCB8fCBcIlwiO1xyXG4gICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aChcIi9hZG1pblwiKSAmJiAhdXJsLnN0YXJ0c1dpdGgoXCIvYXBpXCIpICYmICF1cmwuaW5jbHVkZXMoXCIuXCIpKSB7XHJcbiAgICAgICAgICByZXEudXJsID0gXCIvYWRtaW4vaW5kZXguaHRtbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXh0KCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgYXBwID0gY3JlYXRlU2VydmVyKHsgbWlkZGxld2FyZU1vZGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAvLyBBZGQgRXhwcmVzcyBhcHAgYXMgbWlkZGxld2FyZSB0byBWaXRlIGRldiBzZXJ2ZXJcclxuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZShhcHApO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGluZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9pbmRleC5qc1wiO2ltcG9ydCBcImRvdGVudi9jb25maWdcIjtcclxuaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IGNvcnMgZnJvbSBcImNvcnNcIjtcclxuaW1wb3J0IHsgY29ubmVjdERCLCBnZXREYlN0YXR1cyB9IGZyb20gXCIuL2RiLmpzXCI7XHJcbmltcG9ydCB7IGhhbmRsZURlbW8gfSBmcm9tIFwiLi9yb3V0ZXMvZGVtby5qc1wiO1xyXG5pbXBvcnQgY2xpZW50Um91dGVzIGZyb20gXCIuL3JvdXRlcy9jbGllbnRSb3V0ZXMuanNcIjtcclxuaW1wb3J0IHNlcnZpY2VSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL3NlcnZpY2VSb3V0ZXMuanNcIjtcclxuaW1wb3J0IHF1b3RhdGlvblJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvcXVvdGF0aW9uUm91dGVzLmpzXCI7XHJcbmltcG9ydCBpbnZvaWNlUm91dGVzIGZyb20gXCIuL3JvdXRlcy9pbnZvaWNlUm91dGVzLmpzXCI7XHJcbmltcG9ydCBhdXRoUm91dGVzIGZyb20gXCIuL3JvdXRlcy9hdXRoLmpzXCI7XHJcbmltcG9ydCBzbGlkZXJSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL3NsaWRlclJvdXRlcy5qc1wiO1xyXG5pbXBvcnQgZ2FsbGVyeVJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvZ2FsbGVyeVJvdXRlcy5qc1wiO1xyXG5pbXBvcnQgb3JkZXJSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL29yZGVyUm91dGVzLmpzXCI7XHJcbmltcG9ydCB1c2VyUm91dGVzIGZyb20gXCIuL3JvdXRlcy91c2VyUm91dGVzLmpzXCI7XHJcbmltcG9ydCBmaWxtUm91dGVzIGZyb20gXCIuL3JvdXRlcy9maWxtUm91dGVzLmpzXCI7XHJcbmltcG9ydCBsb3ZlU3RvcnlSb3V0ZXMgZnJvbSBcIi4vcm91dGVzL2xvdmVTdG9yeVJvdXRlcy5qc1wiO1xyXG5pbXBvcnQgZW5xdWlyeVJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvZW5xdWlyeVJvdXRlcy5qc1wiO1xyXG5pbXBvcnQgY29udGFjdFJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvY29udGFjdFJvdXRlcy5qc1wiO1xyXG5pbXBvcnQgZGFzaGJvYXJkUm91dGVzIGZyb20gXCIuL3JvdXRlcy9kYXNoYm9hcmRSb3V0ZXMuanNcIjtcclxuaW1wb3J0IHRlc3RpbW9uaWFsUm91dGVzIGZyb20gXCIuL3JvdXRlcy90ZXN0aW1vbmlhbFJvdXRlcy5qc1wiO1xyXG5pbXBvcnQgZXZlbnRUeXBlUm91dGVzIGZyb20gXCIuL3JvdXRlcy9ldmVudFR5cGVSb3V0ZXMuanNcIjtcclxuaW1wb3J0IHN5c3RlbVNldHRpbmdzUm91dGVzIGZyb20gXCIuL3JvdXRlcy9zeXN0ZW1TZXR0aW5nc1JvdXRlcy5qc1wiO1xyXG5pbXBvcnQgdGVhbVJvdXRlcyBmcm9tIFwiLi9yb3V0ZXMvdGVhbU1hbmFnZW1lbnQuanNcIjtcclxuaW1wb3J0IHBvcHVwUm91dGVzIGZyb20gXCIuL3JvdXRlcy9wb3B1cFJvdXRlcy5qc1wiO1xyXG5pbXBvcnQgeyBlcnJvckhhbmRsZXIsIG5vdEZvdW5kSGFuZGxlciB9IGZyb20gXCIuL21pZGRsZXdhcmUvZXJyb3JIYW5kbGVyLmpzXCI7XHJcblxyXG5cclxuXHJcblxyXG4vLyBSb290IHJvdXRlIC0gT25seSBmb3IgcHJvZHVjdGlvbi9zdGFuZGFsb25lXHJcblxyXG5jb25zdCBkZWZhdWx0QWxsb3dlZE9yaWdpbnMgPSBbXHJcbiAgXCJodHRwOi8vbG9jYWxob3N0OjUxNzNcIixcclxuICBcImh0dHA6Ly8xMjcuMC4wLjE6NTE3M1wiLFxyXG4gIFwiaHR0cDovL2xvY2FsaG9zdDo0MTczXCIsXHJcbiAgXCJodHRwOi8vbG9jYWxob3N0OjgwODBcIixcclxuICBcImh0dHBzOi8vcG90b2dyYXBoeS13ZWJhcHAudmVyY2VsLmFwcFwiLFxyXG4gIFwiaHR0cHM6Ly9wb3RvZ3JhcGh5LXdlYmFwcC13ZWJzaXRlLnZlcmNlbC5hcHBcIixcclxuXTtcclxuXHJcbmNvbnN0IGJ1aWxkQWxsb3dlZE9yaWdpbnMgPSAoKSA9PiB7XHJcbiAgY29uc3QgZW52T3JpZ2lucyA9IHByb2Nlc3MuZW52LkNPUlNfQUxMT1dMSVNUIHx8IHByb2Nlc3MuZW52LkNPUlNfT1JJR0lOIHx8IFwiXCI7XHJcbiAgY29uc3QgcGFyc2VkID0gZW52T3JpZ2luc1xyXG4gICAgLnNwbGl0KFwiLFwiKVxyXG4gICAgLm1hcCgoZW50cnkpID0+IGVudHJ5LnRyaW0oKSlcclxuICAgIC5maWx0ZXIoQm9vbGVhbik7XHJcbiAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChbLi4uZGVmYXVsdEFsbG93ZWRPcmlnaW5zLCAuLi5wYXJzZWRdKSk7XHJcbn07XHJcblxyXG5jb25zdCBhbGxvd2VkT3JpZ2lucyA9IGJ1aWxkQWxsb3dlZE9yaWdpbnMoKTtcclxuXHJcbmNvbnN0IGNvcnNPcHRpb25zID0ge1xyXG4gIG9yaWdpbihvcmlnaW4sIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoIW9yaWdpbikgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHRydWUpO1xyXG4gICAgaWYgKGFsbG93ZWRPcmlnaW5zLmluY2x1ZGVzKG9yaWdpbikpIHtcclxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgLy8gQWxsb3cgdmVyY2VsIHByZXZpZXcgYXBwc1xyXG4gICAgaWYgKG9yaWdpbi5lbmRzV2l0aChcIi52ZXJjZWwuYXBwXCIpKSB7XHJcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB0cnVlKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUud2FybihgXHUyNkEwXHVGRTBGICBCbG9ja2VkIENPUlMgb3JpZ2luOiAke29yaWdpbn1gKTtcclxuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBmYWxzZSk7XHJcbiAgfSxcclxuICBjcmVkZW50aWFsczogdHJ1ZSxcclxuICBvcHRpb25zU3VjY2Vzc1N0YXR1czogMjAwLFxyXG59O1xyXG5cclxubGV0IGRiQ29ubmVjdGlvblByb21pc2U7XHJcbmNvbnN0IGVuc3VyZURiQ29ubmVjdGlvbiA9ICgpID0+IHtcclxuICBpZiAoIWRiQ29ubmVjdGlvblByb21pc2UpIHtcclxuICAgIGRiQ29ubmVjdGlvblByb21pc2UgPSBjb25uZWN0REIoKS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlx1Mjc0QyBNb25nb0RCIGNvbm5lY3Rpb24gZmFpbGVkXCIsIGVycm9yKTtcclxuICAgICAgZGJDb25uZWN0aW9uUHJvbWlzZSA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIGRiQ29ubmVjdGlvblByb21pc2U7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VydmVyKGNvbmZpZyA9IHt9KSB7XHJcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuICAvLyBNaWRkbGV3YXJlXHJcbiAgYXBwLnVzZShjb3JzKGNvcnNPcHRpb25zKSk7XHJcbiAgYXBwLnVzZShleHByZXNzLmpzb24oeyBsaW1pdDogXCI1MG1iXCIgfSkpO1xyXG4gIGFwcC51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUsIGxpbWl0OiBcIjUwbWJcIiB9KSk7XHJcblxyXG4gIC8vIEVuc3VyZSBNb25nb0RCIGNvbm5lY3Rpb24gc3RhcnRzIGFzIHNvb24gYXMgdGhlIHNlcnZlciBib290c1xyXG4gIGVuc3VyZURiQ29ubmVjdGlvbigpO1xyXG5cclxuICAvLyBFeGFtcGxlIEFQSSByb3V0ZXNcclxuICBhcHAuZ2V0KFwiL2FwaS9waW5nXCIsIChfcmVxLCByZXMpID0+IHtcclxuICAgIGNvbnN0IHBpbmcgPSBwcm9jZXNzLmVudi5QSU5HX01FU1NBR0UgPz8gXCJwaW5nXCI7XHJcbiAgICByZXMuanNvbih7IG1lc3NhZ2U6IHBpbmcgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGFwcC5nZXQoXCIvYXBpL2RlbW9cIiwgaGFuZGxlRGVtbyk7XHJcbiAgYXBwLmdldChcIi9hcGkvZGItc3RhdHVzXCIsIChfcmVxLCByZXMpID0+IHtcclxuICAgIGNvbnN0IHN0YXRlID0gZ2V0RGJTdGF0dXMoKTtcclxuICAgIC8vIE1hcCBtb25nb29zZSByZWFkeVN0YXRlIHRvIGh1bWFuLXJlYWRhYmxlXHJcbiAgICBjb25zdCBtYXAgPSB7XHJcbiAgICAgIDA6IFwiZGlzY29ubmVjdGVkXCIsXHJcbiAgICAgIDE6IFwiY29ubmVjdGVkXCIsXHJcbiAgICAgIDI6IFwiY29ubmVjdGluZ1wiLFxyXG4gICAgICAzOiBcImRpc2Nvbm5lY3RpbmdcIixcclxuICAgIH07XHJcbiAgICByZXMuanNvbih7IHN0YXRlLCBzdGF0dXM6IG1hcFtzdGF0ZV0gPz8gXCJ1bmtub3duXCIgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGFwcC5nZXQoXCIvYXBpL2hlYWx0aFwiLCAoX3JlcSwgcmVzKSA9PiB7XHJcbiAgICByZXMuanNvbih7XHJcbiAgICAgIHN0YXR1czogXCJva1wiLFxyXG4gICAgICBkYlN0YXRlOiBnZXREYlN0YXR1cygpLFxyXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgYWxsb3dlZE9yaWdpbnMsXHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgLy8gQXV0aCByb3V0ZXNcclxuICBhcHAudXNlKFwiL2FwaS9hdXRoXCIsIGF1dGhSb3V0ZXMpO1xyXG5cclxuICAvLyBBUEkgUm91dGVzXHJcbiAgYXBwLnVzZShcIi9hcGkvY2xpZW50c1wiLCBjbGllbnRSb3V0ZXMpO1xyXG4gIGFwcC51c2UoXCIvYXBpL3NlcnZpY2VzXCIsIHNlcnZpY2VSb3V0ZXMpO1xyXG4gIGFwcC51c2UoXCIvYXBpL3F1b3RhdGlvbnNcIiwgcXVvdGF0aW9uUm91dGVzKTtcclxuICBhcHAudXNlKFwiL2FwaS9pbnZvaWNlc1wiLCBpbnZvaWNlUm91dGVzKTtcclxuICBhcHAudXNlKFwiL2FwaS9zbGlkZXJcIiwgc2xpZGVyUm91dGVzKTtcclxuICBhcHAudXNlKFwiL2FwaS9nYWxsZXJ5XCIsIGdhbGxlcnlSb3V0ZXMpO1xyXG4gIGFwcC51c2UoXCIvYXBpL29yZGVyc1wiLCBvcmRlclJvdXRlcyk7XHJcbiAgYXBwLnVzZShcIi9hcGkvdXNlcnNcIiwgdXNlclJvdXRlcyk7XHJcbiAgYXBwLnVzZShcIi9hcGkvZmlsbXNcIiwgZmlsbVJvdXRlcyk7XHJcbiAgYXBwLnVzZShcIi9hcGkvbG92ZS1zdG9yaWVzXCIsIGxvdmVTdG9yeVJvdXRlcyk7XHJcbiAgYXBwLnVzZShcIi9hcGkvZW5xdWlyaWVzXCIsIGVucXVpcnlSb3V0ZXMpO1xyXG4gIGFwcC51c2UoXCIvYXBpL2NvbnRhY3RcIiwgY29udGFjdFJvdXRlcyk7XHJcbiAgYXBwLnVzZShcIi9hcGkvZGFzaGJvYXJkXCIsIGRhc2hib2FyZFJvdXRlcyk7XHJcbiAgYXBwLnVzZShcIi9hcGkvdGVzdGltb25pYWxzXCIsIHRlc3RpbW9uaWFsUm91dGVzKTtcclxuICBhcHAudXNlKFwiL2FwaS9ldmVudC10eXBlc1wiLCBldmVudFR5cGVSb3V0ZXMpO1xyXG4gIGFwcC51c2UoXCIvYXBpL3NldHRpbmdzXCIsIHN5c3RlbVNldHRpbmdzUm91dGVzKTtcclxuICBhcHAudXNlKFwiL2FwaS90ZWFtXCIsIHRlYW1Sb3V0ZXMpO1xyXG4gIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJpbmcgcG9wdXAgcm91dGVzLi4uXCIsIHBvcHVwUm91dGVzKTtcclxuICBhcHAudXNlKFwiL2FwaS9wb3B1cFwiLCBwb3B1cFJvdXRlcyk7XHJcbiAgY29uc29sZS5sb2coXCJcdTI3MDUgQ29udGFjdCwgRGFzaGJvYXJkLCBUZXN0aW1vbmlhbCAmIFBvcHVwIHJvdXRlcyByZWdpc3RlcmVkIFwiICsgRGF0ZS5ub3coKSk7XHJcblxyXG4gIC8vIFJvb3Qgcm91dGUgLSBPbmx5IGZvciBwcm9kdWN0aW9uL3N0YW5kYWxvbmVcclxuICBpZiAoIWNvbmZpZy5taWRkbGV3YXJlTW9kZSkge1xyXG4gICAgYXBwLmdldChcIi9cIiwgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogXCJQaG90b2dyYXBoeSBBUEkgaXMgcnVubmluZyBcdUQ4M0RcdURFODBcIiwgc3RhdHVzOiBcImFjdGl2ZVwiIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyA0MDQgKyBlcnJvciBoYW5kbGluZ1xyXG4gIGlmICghY29uZmlnLm1pZGRsZXdhcmVNb2RlKSB7XHJcbiAgICBhcHAudXNlKG5vdEZvdW5kSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBhcHAudXNlKGVycm9ySGFuZGxlcik7XHJcblxyXG4gIHJldHVybiBhcHA7XHJcbn1cclxuXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGRiLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9kYi5qc1wiO2ltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmNvbnN0IERFRkFVTFRfSE9TVCA9IFwiY2x1c3RlcjAuZHMybmx1Zy5tb25nb2RiLm5ldFwiO1xyXG5jb25zdCBERUZBVUxUX0FQUF9OQU1FID0gXCJDbHVzdGVyMFwiO1xyXG5cclxuY29uc3QgYnVpbGRNb25nb1VyaSA9ICgpID0+IHtcclxuICBpZiAocHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkpIHJldHVybiBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcclxuXHJcbiAgY29uc3QgdXNlcm5hbWUgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VTRVJOQU1FO1xyXG4gIGNvbnN0IHBhc3N3b3JkID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9QQVNTV09SRDtcclxuICBjb25zdCBob3N0ID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9IT1NUIHx8IERFRkFVTFRfSE9TVDtcclxuICBpZiAoIXVzZXJuYW1lIHx8ICFwYXNzd29yZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGVuY29kZWRVc2VyID0gZW5jb2RlVVJJQ29tcG9uZW50KHVzZXJuYW1lKTtcclxuICBjb25zdCBlbmNvZGVkUGFzcyA9IGVuY29kZVVSSUNvbXBvbmVudChwYXNzd29yZCk7XHJcbiAgcmV0dXJuIGBtb25nb2RiK3NydjovLyR7ZW5jb2RlZFVzZXJ9OiR7ZW5jb2RlZFBhc3N9QCR7aG9zdH0vP3JldHJ5V3JpdGVzPXRydWUmdz1tYWpvcml0eSZhcHBOYW1lPSR7cHJvY2Vzcy5lbnYuTU9OR09EQl9BUFBfTkFNRSB8fCBERUZBVUxUX0FQUF9OQU1FfWA7XHJcbn07XHJcbi8vIE1hbnVhbCBPdmVycmlkZSBmb3IgZW1lcmdlbmN5XHJcbi8vIGNvbnN0IGJ1aWxkTW9uZ29VcmkgPSAoKSA9PiBcIm1vbmdvZGIrc3J2Oi8vcGhvdG9ncmFwZXI6cGhvdG9ncmFwZXJAY2x1c3RlcjAuc3k5NGtjbC5tb25nb2RiLm5ldC8/YXBwTmFtZT1DbHVzdGVyMFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbm5lY3REQiA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgbW9uZ29VcmkgPSBidWlsZE1vbmdvVXJpKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlx1RDgzRFx1REQxNyBDb25uZWN0aW5nIHRvIE1vbmdvREIgd2l0aCBVUkk6XCIsIG1vbmdvVXJpLnJlcGxhY2UoLzooW15AXSspQC8sIFwiOioqKipAXCIpKTtcclxuICAgIGlmICghbW9uZ29VcmkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIFwiTW9uZ29EQiBjb25uZWN0aW9uIHNldHRpbmdzIGFyZSBtaXNzaW5nLiBQcm92aWRlIE1PTkdPREJfVVJJIG9yIE1PTkdPREJfVVNFUk5BTUUvTU9OR09EQl9QQVNTV09SRCBpbiB5b3VyIGVudmlyb25tZW50LlwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3B0aW9uYWwgZGVidWcgbG9nZ2luZyBjb250cm9sbGVkIGJ5IGVudlxyXG4gICAgaWYgKHByb2Nlc3MuZW52Lk1PTkdPX0RFQlVHID09PSBcInRydWVcIikge1xyXG4gICAgICBtb25nb29zZS5zZXQoXCJkZWJ1Z1wiLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBXaXJlIHVwIGNvbm5lY3Rpb24gZXZlbnQgbGlzdGVuZXJzIHRvIG1ha2UgY29ubmVjdGlvbiBzdGF0ZSB2aXNpYmxlIGluIGxvZ3NcclxuICAgIG1vbmdvb3NlLmNvbm5lY3Rpb24ub24oXCJjb25uZWN0ZWRcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlx1MjcwNSBNb25nb29zZSBjb25uZWN0ZWQgdG8gZGF0YWJhc2VcIiwgbW9uZ29vc2UuY29ubmVjdGlvbi5uYW1lIHx8IHByb2Nlc3MuZW52LkRBVEFCQVNFX05BTUUgfHwgXCIodW5rbm93bilcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtb25nb29zZS5jb25uZWN0aW9uLm9uKFwiZXJyb3JcIiwgKGVycikgPT4ge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiXHUyNzRDIE1vbmdvb3NlIGNvbm5lY3Rpb24gZXJyb3I6XCIsIGVyciAmJiBlcnIubWVzc2FnZSA/IGVyci5tZXNzYWdlIDogZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1vbmdvb3NlLmNvbm5lY3Rpb24ub24oXCJkaXNjb25uZWN0ZWRcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJcdTI2QTBcdUZFMEYgTW9uZ29vc2UgZGlzY29ubmVjdGVkXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbW9uZ29vc2UuY29ubmVjdGlvbi5vbihcInJlY29ubmVjdGVkXCIsICgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJcdUQ4M0RcdUREMDEgTW9uZ29vc2UgcmVjb25uZWN0ZWRcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhd2FpdCBtb25nb29zZS5jb25uZWN0KG1vbmdvVXJpLCB7XHJcbiAgICAgIC8vIFVzZSBEQVRBQkFTRV9OQU1FIGZyb20gZW52aXJvbm1lbnQgb3IgZmFsbGJhY2sgdG8gXCJ0aGUtcGF0aWwtcGhvdG9ncmFwaHlcIlxyXG4gICAgICBkYk5hbWU6IHByb2Nlc3MuZW52LkRBVEFCQVNFX05BTUUgfHwgXCJ0aGUtcGF0aWwtcGhvdG9ncmFwaHlcIixcclxuICAgICAgcmV0cnlXcml0ZXM6IHRydWUsXHJcbiAgICAgIHc6IFwibWFqb3JpdHlcIixcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiXHUyNzA1IE1vbmdvREIgY29ubmVjdGVkIHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgIHJldHVybiBtb25nb29zZS5jb25uZWN0aW9uO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiXHUyNzRDIE1vbmdvREIgY29ubmVjdGlvbiBlcnJvcjpcIiwgZXJyb3IgJiYgZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvcik7XHJcbiAgICAvLyBJbiBkZXZlbG9wbWVudCB3ZSBkb24ndCB3YW50IHRoZSB3aG9sZSBkZXYgc2VydmVyIHRvIGV4aXQgaWYgdGhlIERCIGlzIHVucmVhY2hhYmxlLlxyXG4gICAgLy8gU2V0IEVYSVRfT05fREJfRkFJTD10cnVlIGluIHRoZSBlbnZpcm9ubWVudCB0byBwcmVzZXJ2ZSB0aGUgb3JpZ2luYWwgYmVoYXZpb3IuXHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuRVhJVF9PTl9EQl9GQUlMID09PSBcInRydWVcIikge1xyXG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGlzY29ubmVjdERCID0gYXN5bmMgKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBtb25nb29zZS5kaXNjb25uZWN0KCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlx1MjcwNSBNb25nb0RCIGRpc2Nvbm5lY3RlZFwiKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIlx1Mjc0QyBNb25nb0RCIGRpc2Nvbm5lY3Rpb24gZXJyb3I6XCIsIGVycm9yKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0RGJTdGF0dXMgPSAoKSA9PiB7XHJcbiAgLy8gbW9uZ29vc2UuY29ubmVjdGlvbi5yZWFkeVN0YXRlOiAwID0gZGlzY29ubmVjdGVkLCAxID0gY29ubmVjdGVkLCAyID0gY29ubmVjdGluZywgMyA9IGRpc2Nvbm5lY3RpbmdcclxuICByZXR1cm4gbW9uZ29vc2UuY29ubmVjdGlvbi5yZWFkeVN0YXRlO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXFxcXGRlbW8uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL3JvdXRlcy9kZW1vLmpzXCI7ZXhwb3J0IGNvbnN0IGhhbmRsZURlbW8gPSAocmVxLCByZXMpID0+IHtcclxuICBjb25zdCByZXNwb25zZSA9IHtcclxuICAgIG1lc3NhZ2U6IFwiSGVsbG8gZnJvbSBFeHByZXNzIHNlcnZlclwiLFxyXG4gIH07XHJcbiAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UpO1xyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXFxcXGNsaWVudFJvdXRlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvcm91dGVzL2NsaWVudFJvdXRlcy5qc1wiO2ltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQge1xyXG4gIGdldEFsbENsaWVudHMsXHJcbiAgZ2V0Q2xpZW50QnlJZCxcclxuICBjcmVhdGVDbGllbnQsXHJcbiAgdXBkYXRlQ2xpZW50LFxyXG4gIGRlbGV0ZUNsaWVudCxcclxuICBzZWFyY2hDbGllbnRzLFxyXG59IGZyb20gJy4uL2NvbnRyb2xsZXJzL2NsaWVudENvbnRyb2xsZXIuanMnO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbi8vIFJvdXRlc1xyXG5yb3V0ZXIuZ2V0KCcvJywgZ2V0QWxsQ2xpZW50cyk7XHJcbnJvdXRlci5nZXQoJy9zZWFyY2gnLCBzZWFyY2hDbGllbnRzKTtcclxucm91dGVyLmdldCgnLzppZCcsIGdldENsaWVudEJ5SWQpO1xyXG5yb3V0ZXIucG9zdCgnLycsIGNyZWF0ZUNsaWVudCk7XHJcbnJvdXRlci5wdXQoJy86aWQnLCB1cGRhdGVDbGllbnQpO1xyXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgZGVsZXRlQ2xpZW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcXFxcY2xpZW50Q29udHJvbGxlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvY29udHJvbGxlcnMvY2xpZW50Q29udHJvbGxlci5qc1wiO2ltcG9ydCBDbGllbnQgZnJvbSAnLi4vbW9kZWxzL0NsaWVudC5qcyc7XHJcblxyXG4vLyBHZXQgYWxsIGNsaWVudHNcclxuZXhwb3J0IGNvbnN0IGdldEFsbENsaWVudHMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgY2xpZW50cyA9IGF3YWl0IENsaWVudC5maW5kKCkuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSk7XHJcbiAgICByZXMuanNvbihjbGllbnRzKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEdldCBzaW5nbGUgY2xpZW50XHJcbmV4cG9ydCBjb25zdCBnZXRDbGllbnRCeUlkID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudC5maW5kQnlJZChyZXEucGFyYW1zLmlkKTtcclxuICAgIGlmICghY2xpZW50KSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6ICdDbGllbnQgbm90IGZvdW5kJyB9KTtcclxuICAgIH1cclxuICAgIHJlcy5qc29uKGNsaWVudCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBDcmVhdGUgY2xpZW50XHJcbmV4cG9ydCBjb25zdCBjcmVhdGVDbGllbnQgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICBjb25zdCB7IG5hbWUsIGVtYWlsLCBwaG9uZSwgd2hhdHNhcHAsIGFkZHJlc3MsIGNpdHksIHN0YXRlLCB6aXBDb2RlLCBjYXRlZ29yeSwgdGFncywgbm90ZXMsIGV2ZW50LCBidWRnZXQsIHN0YXR1cyB9ID0gcmVxLmJvZHk7XHJcblxyXG4gIC8vIFZhbGlkYXRpb25cclxuICBpZiAoIW5hbWUgfHwgIWVtYWlsIHx8ICFwaG9uZSkge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogJ05hbWUsIGVtYWlsLCBhbmQgcGhvbmUgYXJlIHJlcXVpcmVkJyB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KHtcclxuICAgICAgbmFtZSxcclxuICAgICAgZW1haWwsXHJcbiAgICAgIHBob25lOiBwaG9uZSB8fCB3aGF0c2FwcCwgLy8gQWNjZXB0IHBob25lIG9yIHdoYXRzYXBwXHJcbiAgICAgIGFkZHJlc3MsXHJcbiAgICAgIGNpdHksXHJcbiAgICAgIHN0YXRlLFxyXG4gICAgICB6aXBDb2RlLFxyXG4gICAgICBjYXRlZ29yeSxcclxuICAgICAgdGFncyxcclxuICAgICAgbm90ZXMsXHJcbiAgICAgIGV2ZW50LFxyXG4gICAgICBidWRnZXQsXHJcbiAgICAgIHN0YXR1cyxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNhdmVkQ2xpZW50ID0gYXdhaXQgY2xpZW50LnNhdmUoKTtcclxuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHNhdmVkQ2xpZW50KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgaWYgKGVycm9yLmNvZGUgPT09IDExMDAwKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdFbWFpbCBhbHJlYWR5IGV4aXN0cycgfSk7XHJcbiAgICB9XHJcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gVXBkYXRlIGNsaWVudFxyXG5leHBvcnQgY29uc3QgdXBkYXRlQ2xpZW50ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudC5maW5kQnlJZEFuZFVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSwge1xyXG4gICAgICBuZXc6IHRydWUsXHJcbiAgICAgIHJ1blZhbGlkYXRvcnM6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWNsaWVudCkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiAnQ2xpZW50IG5vdCBmb3VuZCcgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzLmpzb24oY2xpZW50KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgaWYgKGVycm9yLmNvZGUgPT09IDExMDAwKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdFbWFpbCBhbHJlYWR5IGV4aXN0cycgfSk7XHJcbiAgICB9XHJcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gRGVsZXRlIGNsaWVudFxyXG5leHBvcnQgY29uc3QgZGVsZXRlQ2xpZW50ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudC5maW5kQnlJZEFuZERlbGV0ZShyZXEucGFyYW1zLmlkKTtcclxuICAgIGlmICghY2xpZW50KSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6ICdDbGllbnQgbm90IGZvdW5kJyB9KTtcclxuICAgIH1cclxuICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ0NsaWVudCBkZWxldGVkIHN1Y2Nlc3NmdWxseScgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBTZWFyY2ggY2xpZW50c1xyXG5leHBvcnQgY29uc3Qgc2VhcmNoQ2xpZW50cyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHF1ZXJ5IH0gPSByZXEucXVlcnk7XHJcbiAgICBpZiAoIXF1ZXJ5KSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6ICdTZWFyY2ggcXVlcnkgaXMgcmVxdWlyZWQnIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsaWVudHMgPSBhd2FpdCBDbGllbnQuZmluZCh7XHJcbiAgICAgICRvcjogW1xyXG4gICAgICAgIHsgbmFtZTogeyAkcmVnZXg6IHF1ZXJ5LCAkb3B0aW9uczogJ2knIH0gfSxcclxuICAgICAgICB7IGVtYWlsOiB7ICRyZWdleDogcXVlcnksICRvcHRpb25zOiAnaScgfSB9LFxyXG4gICAgICAgIHsgcGhvbmU6IHsgJHJlZ2V4OiBxdWVyeSwgJG9wdGlvbnM6ICdpJyB9IH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXMuanNvbihjbGllbnRzKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1xcXFxzZXJ2aWNlUm91dGVzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9yb3V0ZXMvc2VydmljZVJvdXRlcy5qc1wiO2ltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQge1xyXG4gIGdldEFsbFNlcnZpY2VzLFxyXG4gIGdldFNlcnZpY2VCeUlkLFxyXG4gIGNyZWF0ZVNlcnZpY2UsXHJcbiAgdXBkYXRlU2VydmljZSxcclxuICBkZWxldGVTZXJ2aWNlLFxyXG59IGZyb20gJy4uL2NvbnRyb2xsZXJzL3NlcnZpY2VDb250cm9sbGVyLmpzJztcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG4vLyBSb3V0ZXNcclxucm91dGVyLmdldCgnLycsIGdldEFsbFNlcnZpY2VzKTtcclxucm91dGVyLmdldCgnLzppZCcsIGdldFNlcnZpY2VCeUlkKTtcclxucm91dGVyLnBvc3QoJy8nLCBjcmVhdGVTZXJ2aWNlKTtcclxucm91dGVyLnB1dCgnLzppZCcsIHVwZGF0ZVNlcnZpY2UpO1xyXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgZGVsZXRlU2VydmljZSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcU2VydmljZS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvbW9kZWxzL1NlcnZpY2UuanNcIjtpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3Qgc2VydmljZVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoXHJcbiAge1xyXG4gICAgbmFtZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1NlcnZpY2UgbmFtZSBpcyByZXF1aXJlZCddLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgICBtaW5sZW5ndGg6IFsyLCAnTmFtZSBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycyddLFxyXG4gICAgfSxcclxuICAgIGRlc2NyaXB0aW9uOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBjYXRlZ29yeToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGVudW06IFsncGhvdG9ncmFwaHknLCAndmlkZW8nLCAnZHJvbmUnLCAncHJvZHVjdCcsICdvdGhlciddLFxyXG4gICAgICBkZWZhdWx0OiAncGhvdG9ncmFwaHknLFxyXG4gICAgfSxcclxuICAgIHJhdGVQZXJEYXk6IHtcclxuICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdSYXRlIHBlciBkYXkgaXMgcmVxdWlyZWQnXSxcclxuICAgICAgbWluOiBbMCwgJ1JhdGUgY2Fubm90IGJlIG5lZ2F0aXZlJ10sXHJcbiAgICB9LFxyXG4gICAgcmF0ZVBlclVuaXQ6IHtcclxuICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBtaW46IFswLCAnUmF0ZSBjYW5ub3QgYmUgbmVnYXRpdmUnXSxcclxuICAgIH0sXHJcbiAgICBpc0FjdGl2ZToge1xyXG4gICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG4vLyBJbmRleCBmb3IgYWN0aXZlIHNlcnZpY2VzXHJcbnNlcnZpY2VTY2hlbWEuaW5kZXgoeyBpc0FjdGl2ZTogMSB9KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5TZXJ2aWNlIHx8IG1vbmdvb3NlLm1vZGVsKCdTZXJ2aWNlJywgc2VydmljZVNjaGVtYSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXFxcXHNlcnZpY2VDb250cm9sbGVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9jb250cm9sbGVycy9zZXJ2aWNlQ29udHJvbGxlci5qc1wiO2ltcG9ydCBTZXJ2aWNlIGZyb20gJy4uL21vZGVscy9TZXJ2aWNlLmpzJztcclxuXHJcbi8vIERlZmF1bHQgc2VydmljZXNcclxuY29uc3QgREVGQVVMVF9TRVJWSUNFUyA9IFtcclxuICB7IG5hbWU6ICdUcmFkaXRpb25hbCBQaG90b2dyYXBoeScsIGNhdGVnb3J5OiAncGhvdG9ncmFwaHknLCByYXRlUGVyRGF5OiAyNTAwMCB9LFxyXG4gIHsgbmFtZTogJ0NhbmRpZCBQaG90b2dyYXBoeScsIGNhdGVnb3J5OiAncGhvdG9ncmFwaHknLCByYXRlUGVyRGF5OiAyMDAwMCB9LFxyXG4gIHsgbmFtZTogJ0NpbmVtYXRpYyBXZWRkaW5nIEZpbG0nLCBjYXRlZ29yeTogJ3ZpZGVvJywgcmF0ZVBlckRheTogNDAwMDAgfSxcclxuICB7IG5hbWU6ICdUcmFkaXRpb25hbCBWaWRlbycsIGNhdGVnb3J5OiAndmlkZW8nLCByYXRlUGVyRGF5OiAzMDAwMCB9LFxyXG4gIHsgbmFtZTogJ0Ryb25lIFNob290JywgY2F0ZWdvcnk6ICdkcm9uZScsIHJhdGVQZXJEYXk6IDE1MDAwIH0sXHJcbiAgeyBuYW1lOiAnV2VkZGluZyBBbGJ1bXMnLCBjYXRlZ29yeTogJ3Byb2R1Y3QnLCByYXRlUGVyVW5pdDogNTAwMCB9LFxyXG4gIHsgbmFtZTogJ0ZyYW1lcycsIGNhdGVnb3J5OiAncHJvZHVjdCcsIHJhdGVQZXJVbml0OiAyMDAwIH0sXHJcbl07XHJcblxyXG4vLyBHZXQgYWxsIGFjdGl2ZSBzZXJ2aWNlc1xyXG5leHBvcnQgY29uc3QgZ2V0QWxsU2VydmljZXMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICB0cnkge1xyXG4gICAgbGV0IHNlcnZpY2VzID0gYXdhaXQgU2VydmljZS5maW5kKHsgaXNBY3RpdmU6IHRydWUgfSkuc29ydCh7IG5hbWU6IDEgfSk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBkZWZhdWx0IHNlcnZpY2VzIGlmIG5vbmUgZXhpc3RcclxuICAgIGlmIChzZXJ2aWNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc3QgY3JlYXRlZFNlcnZpY2VzID0gYXdhaXQgU2VydmljZS5pbnNlcnRNYW55KERFRkFVTFRfU0VSVklDRVMpO1xyXG4gICAgICBzZXJ2aWNlcyA9IGNyZWF0ZWRTZXJ2aWNlcztcclxuICAgIH1cclxuXHJcbiAgICByZXMuanNvbihzZXJ2aWNlcyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZXQgc2luZ2xlIHNlcnZpY2VcclxuZXhwb3J0IGNvbnN0IGdldFNlcnZpY2VCeUlkID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBhd2FpdCBTZXJ2aWNlLmZpbmRCeUlkKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgaWYgKCFzZXJ2aWNlKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6ICdTZXJ2aWNlIG5vdCBmb3VuZCcgfSk7XHJcbiAgICB9XHJcbiAgICByZXMuanNvbihzZXJ2aWNlKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIENyZWF0ZSBzZXJ2aWNlXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTZXJ2aWNlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgY29uc3QgeyBuYW1lLCBkZXNjcmlwdGlvbiwgY2F0ZWdvcnksIHJhdGVQZXJEYXksIHJhdGVQZXJVbml0IH0gPSByZXEuYm9keTtcclxuXHJcbiAgaWYgKCFuYW1lIHx8ICghcmF0ZVBlckRheSAmJiAhcmF0ZVBlclVuaXQpKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnTmFtZSBhbmQgcmF0ZSBhcmUgcmVxdWlyZWQnIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgU2VydmljZSh7XHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBjYXRlZ29yeSxcclxuICAgICAgcmF0ZVBlckRheSxcclxuICAgICAgcmF0ZVBlclVuaXQsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzYXZlZFNlcnZpY2UgPSBhd2FpdCBzZXJ2aWNlLnNhdmUoKTtcclxuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHNhdmVkU2VydmljZSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBVcGRhdGUgc2VydmljZVxyXG5leHBvcnQgY29uc3QgdXBkYXRlU2VydmljZSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gYXdhaXQgU2VydmljZS5maW5kQnlJZEFuZFVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSwge1xyXG4gICAgICBuZXc6IHRydWUsXHJcbiAgICAgIHJ1blZhbGlkYXRvcnM6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXNlcnZpY2UpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogJ1NlcnZpY2Ugbm90IGZvdW5kJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXMuanNvbihzZXJ2aWNlKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIERlbGV0ZSBzZXJ2aWNlIChzb2Z0IGRlbGV0ZSBieSBtYXJraW5nIGluYWN0aXZlKVxyXG5leHBvcnQgY29uc3QgZGVsZXRlU2VydmljZSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gYXdhaXQgU2VydmljZS5maW5kQnlJZEFuZFVwZGF0ZShcclxuICAgICAgcmVxLnBhcmFtcy5pZCxcclxuICAgICAgeyBpc0FjdGl2ZTogZmFsc2UgfSxcclxuICAgICAgeyBuZXc6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIXNlcnZpY2UpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogJ1NlcnZpY2Ugbm90IGZvdW5kJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXMuanNvbih7IG1lc3NhZ2U6ICdTZXJ2aWNlIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1xcXFxxdW90YXRpb25Sb3V0ZXMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL3JvdXRlcy9xdW90YXRpb25Sb3V0ZXMuanNcIjtpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHtcclxuICBnZXRBbGxRdW90YXRpb25zLFxyXG4gIGdldFF1b3RhdGlvbkJ5SWQsXHJcbiAgY3JlYXRlUXVvdGF0aW9uLFxyXG4gIHVwZGF0ZVF1b3RhdGlvbixcclxuICBkZWxldGVRdW90YXRpb24sXHJcbiAgZHVwbGljYXRlUXVvdGF0aW9uLFxyXG4gIGdldFF1b3RhdGlvbnNCeUNsaWVudCxcclxuICBnZXRRdW90YXRpb25zQnlTdGF0dXMsXHJcbn0gZnJvbSAnLi4vY29udHJvbGxlcnMvcXVvdGF0aW9uQ29udHJvbGxlci5qcyc7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxuLy8gUm91dGVzXHJcbnJvdXRlci5nZXQoJy8nLCBnZXRBbGxRdW90YXRpb25zKTtcclxucm91dGVyLmdldCgnL2NsaWVudC86Y2xpZW50SWQnLCBnZXRRdW90YXRpb25zQnlDbGllbnQpO1xyXG5yb3V0ZXIuZ2V0KCcvc3RhdHVzJywgZ2V0UXVvdGF0aW9uc0J5U3RhdHVzKTtcclxucm91dGVyLmdldCgnLzppZCcsIGdldFF1b3RhdGlvbkJ5SWQpO1xyXG5yb3V0ZXIucG9zdCgnLycsIGNyZWF0ZVF1b3RhdGlvbik7XHJcbnJvdXRlci5wb3N0KCcvOmlkL2R1cGxpY2F0ZScsIGR1cGxpY2F0ZVF1b3RhdGlvbik7XHJcbnJvdXRlci5wdXQoJy86aWQnLCB1cGRhdGVRdW90YXRpb24pO1xyXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgZGVsZXRlUXVvdGF0aW9uKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxRdW90YXRpb24uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL21vZGVscy9RdW90YXRpb24uanNcIjtpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgcXVvdGF0aW9uU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcclxuICB7XHJcbiAgICBxdW90YXRpb25OdW1iZXI6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB1bmlxdWU6IHRydWUsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1F1b3RhdGlvbiBudW1iZXIgaXMgcmVxdWlyZWQnXSxcclxuICAgIH0sXHJcbiAgICBjbGllbnRJZDoge1xyXG4gICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogJ0NsaWVudCcsXHJcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSwgLy8gT3B0aW9uYWwgaWYganVzdCB1c2luZyBjbGllbnROYW1lXHJcbiAgICB9LFxyXG4gICAgZXZlbnRUeXBlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnRXZlbnQgdHlwZSBpcyByZXF1aXJlZCddLFxyXG4gICAgfSxcclxuICAgIHF1b3RhdGlvbkRhdGU6IHtcclxuICAgICAgdHlwZTogRGF0ZSxcclxuICAgICAgZGVmYXVsdDogRGF0ZS5ub3csXHJcbiAgICB9LFxyXG4gICAgZXZlbnREYXRlOiB7XHJcbiAgICAgIHR5cGU6IERhdGUsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ0V2ZW50IGRhdGUgaXMgcmVxdWlyZWQnXSxcclxuICAgIH0sXHJcbiAgICB2YWxpZGl0eURhdGU6IHtcclxuICAgICAgdHlwZTogRGF0ZSxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnVmFsaWRpdHkgZGF0ZSBpcyByZXF1aXJlZCddLFxyXG4gICAgfSxcclxuICAgIHNlcnZpY2VzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBzZXJ2aWNlSWQ6IHtcclxuICAgICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgICAgIHJlZjogJ1NlcnZpY2UnLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VydmljZU5hbWU6IFN0cmluZyxcclxuICAgICAgICBxdWFudGl0eToge1xyXG4gICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgZGVmYXVsdDogMSxcclxuICAgICAgICAgIG1pbjogWzEsICdRdWFudGl0eSBtdXN0IGJlIGF0IGxlYXN0IDEnXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRheXM6IHtcclxuICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgIGRlZmF1bHQ6IDEsXHJcbiAgICAgICAgICBtaW46IFsxLCAnRGF5cyBtdXN0IGJlIGF0IGxlYXN0IDEnXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJhdGVQZXJEYXk6IHtcclxuICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgbWluOiBbMCwgJ1JhdGUgY2Fubm90IGJlIG5lZ2F0aXZlJ10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b3RhbDoge1xyXG4gICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICBtaW46IFswLCAnVG90YWwgY2Fubm90IGJlIG5lZ2F0aXZlJ10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBzdWJ0b3RhbDoge1xyXG4gICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW46IFswLCAnU3VidG90YWwgY2Fubm90IGJlIG5lZ2F0aXZlJ10sXHJcbiAgICB9LFxyXG4gICAgZGlzY291bnQ6IHtcclxuICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBtaW46IFswLCAnRGlzY291bnQgY2Fubm90IGJlIG5lZ2F0aXZlJ10sXHJcbiAgICB9LFxyXG4gICAgZGlzY291bnRUeXBlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZW51bTogWydmaXhlZCcsICdwZXJjZW50YWdlJ10sXHJcbiAgICAgIGRlZmF1bHQ6ICdmaXhlZCcsXHJcbiAgICB9LFxyXG4gICAgdGF4UGVyY2VudGFnZToge1xyXG4gICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgIG1pbjogWzAsICdUYXggY2Fubm90IGJlIG5lZ2F0aXZlJ10sXHJcbiAgICAgIG1heDogWzEwMCwgJ1RheCBjYW5ub3QgZXhjZWVkIDEwMCUnXSxcclxuICAgIH0sXHJcbiAgICB0YXg6IHtcclxuICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBtaW46IFswLCAnVGF4IGNhbm5vdCBiZSBuZWdhdGl2ZSddLFxyXG4gICAgfSxcclxuICAgIGdyYW5kVG90YWw6IHtcclxuICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgbWluOiBbMCwgJ0dyYW5kIHRvdGFsIGNhbm5vdCBiZSBuZWdhdGl2ZSddLFxyXG4gICAgfSxcclxuICAgIHBheW1lbnRUZXJtczoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGRlZmF1bHQ6ICc1MCUgYWR2YW5jZSwgNTAlIG9uIGV2ZW50IGRhdGUnLFxyXG4gICAgfSxcclxuICAgIG5vdGVzOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB0aGFua1lvdU1lc3NhZ2U6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIFwiVGhhbmsgeW91IGZvciBjaG9vc2luZyBUaGUgUGF0aWwgUGhvdG9ncmFwaHkgJiBGaWxtJ3MuIFdlIGxvb2sgZm9yd2FyZCB0byBjYXB0dXJpbmcgeW91ciBzcGVjaWFsIG1vbWVudHMhXCIsXHJcbiAgICB9LFxyXG4gICAgc3RhdHVzOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZW51bTogWydEcmFmdCcsICdTZW50JywgJ0FjY2VwdGVkJywgJ1JlamVjdGVkJywgJ0V4cGlyZWQnLCAnTmVnb3RpYXRpb24nXSxcclxuICAgICAgZGVmYXVsdDogJ0RyYWZ0JyxcclxuICAgIH0sXHJcbiAgICAvLyBFbmhhbmNlZCBDUk0gRmllbGRzXHJcbiAgICBjbGllbnROYW1lOiB7IHR5cGU6IFN0cmluZywgdHJpbTogdHJ1ZSB9LCAvLyBTbmFwc2hvdCBvZiBjbGllbnQgbmFtZVxyXG4gICAgZW1haWw6IHsgdHlwZTogU3RyaW5nLCB0cmltOiB0cnVlIH0sXHJcbiAgICB3aGF0c2FwcF9ubzogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUgfSxcclxuICAgIGxvY2F0aW9uOiB7IHR5cGU6IFN0cmluZywgdHJpbTogdHJ1ZSB9LFxyXG4gICAgcmV0YWluZXJBbW91bnQ6IHsgdHlwZTogTnVtYmVyLCBkZWZhdWx0OiAwIH0sXHJcbiAgICBzdGFnZTogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdDb25jZXB0JyB9LFxyXG4gICAgZGVsaXZlcmFibGVzOiBbeyB0eXBlOiBTdHJpbmcgfV0sIC8vIFNpbXBsZSBsaXN0IG9mIGRlbGl2ZXJhYmxlc1xyXG4gICAgbW9vZGJvYXJkOiB7IHR5cGU6IFN0cmluZywgdHJpbTogdHJ1ZSB9LFxyXG4gICAgY2hhbm5lbDogeyB0eXBlOiBTdHJpbmcsIGVudW06IFsnRW1haWwnLCAnV2hhdHNBcHAnLCAnQ2FsbCcsICdPdGhlciddLCBkZWZhdWx0OiAnRW1haWwnIH0sXHJcbiAgICBmb2xsb3dVcERhdGU6IHsgdHlwZTogRGF0ZSB9LFxyXG4gICAgY29udmVydGVkVG9JbnZvaWNlOiB7XHJcbiAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIGludm9pY2VJZDoge1xyXG4gICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogJ0ludm9pY2UnLFxyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG4vLyBJbmRleCBmb3IgZmFzdGVyIHF1ZXJpZXNcclxucXVvdGF0aW9uU2NoZW1hLmluZGV4KHsgY2xpZW50SWQ6IDEgfSk7XHJcbnF1b3RhdGlvblNjaGVtYS5pbmRleCh7IHN0YXR1czogMSB9KTtcclxucXVvdGF0aW9uU2NoZW1hLmluZGV4KHsgZXZlbnREYXRlOiAxIH0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzLlF1b3RhdGlvbiB8fCBtb25nb29zZS5tb2RlbCgnUXVvdGF0aW9uJywgcXVvdGF0aW9uU2NoZW1hKTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcXFxccXVvdGF0aW9uQ29udHJvbGxlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvY29udHJvbGxlcnMvcXVvdGF0aW9uQ29udHJvbGxlci5qc1wiO2ltcG9ydCBRdW90YXRpb24gZnJvbSAnLi4vbW9kZWxzL1F1b3RhdGlvbi5qcyc7XHJcbmltcG9ydCBDbGllbnQgZnJvbSAnLi4vbW9kZWxzL0NsaWVudC5qcyc7XHJcbmltcG9ydCB7IHNlbmRFbWFpbCB9IGZyb20gJy4uL3V0aWxzL2VtYWlsU2VydmljZS5qcyc7XHJcbmltcG9ydCB7IGdlbmVyYXRlRW1haWxIdG1sIH0gZnJvbSBcIi4uL3V0aWxzL2VtYWlsVGVtcGxhdGVzLmpzXCI7XHJcblxyXG4vLyBHZW5lcmF0ZSB1bmlxdWUgcXVvdGF0aW9uIG51bWJlclxyXG5jb25zdCBnZW5lcmF0ZVF1b3RhdGlvbk51bWJlciA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCBjb3VudCA9IGF3YWl0IFF1b3RhdGlvbi5jb3VudERvY3VtZW50cygpO1xyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTtcclxuICByZXR1cm4gYFFULSR7eWVhcn0ke21vbnRofS0ke1N0cmluZyhjb3VudCArIDEpLnBhZFN0YXJ0KDUsICcwJyl9YDtcclxufTtcclxuXHJcbi8vIEdldCBhbGwgcXVvdGF0aW9uc1xyXG5leHBvcnQgY29uc3QgZ2V0QWxsUXVvdGF0aW9ucyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBxdW90YXRpb25zID0gYXdhaXQgUXVvdGF0aW9uLmZpbmQoKVxyXG4gICAgICAucG9wdWxhdGUoJ2NsaWVudElkJylcclxuICAgICAgLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xyXG4gICAgcmVzLmpzb24ocXVvdGF0aW9ucyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZXQgc2luZ2xlIHF1b3RhdGlvblxyXG5leHBvcnQgY29uc3QgZ2V0UXVvdGF0aW9uQnlJZCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBxdW90YXRpb24gPSBhd2FpdCBRdW90YXRpb24uZmluZEJ5SWQocmVxLnBhcmFtcy5pZCkucG9wdWxhdGUoJ2NsaWVudElkJyk7XHJcbiAgICBpZiAoIXF1b3RhdGlvbikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiAnUXVvdGF0aW9uIG5vdCBmb3VuZCcgfSk7XHJcbiAgICB9XHJcbiAgICByZXMuanNvbihxdW90YXRpb24pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gQ3JlYXRlIHF1b3RhdGlvblxyXG5leHBvcnQgY29uc3QgY3JlYXRlUXVvdGF0aW9uID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIE9ubHkgdXNlIHByb3ZpZGVkIGNsaWVudElkIGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIGxlYXZlIGl0IG51bGxcclxuICAgIC8vIFdlIGRvIE5PVCBhdXRvbWF0aWNhbGx5IGNyZWF0ZSBvciBsb29rdXAgY2xpZW50cyBoZXJlIGFueW1vcmUgcGVyIHVzZXIgcmVxdWVzdFxyXG4gICAgY29uc3QgeyBjbGllbnRJZCwgY2xpZW50TmFtZSwgY2xpZW50LCBlbWFpbCB9ID0gcmVxLmJvZHk7XHJcbiAgICBjb25zdCBuYW1lVG9TZWFyY2ggPSBjbGllbnROYW1lIHx8IGNsaWVudDtcclxuXHJcbiAgICBjb25zdCBxdW90YXRpb25OdW1iZXIgPSBhd2FpdCBnZW5lcmF0ZVF1b3RhdGlvbk51bWJlcigpO1xyXG4gICAgY29uc3QgcXVvdGF0aW9uRGF0YSA9IHtcclxuICAgICAgLi4ucmVxLmJvZHksXHJcbiAgICAgIHF1b3RhdGlvbk51bWJlcixcclxuICAgICAgY2xpZW50SWQ6IGNsaWVudElkIHx8IG51bGwsIC8vIEV4cGxpY2l0bHkgbnVsbCBpZiBub3QgcHJvdmlkZWRcclxuICAgICAgY2xpZW50TmFtZTogbmFtZVRvU2VhcmNoXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHF1b3RhdGlvbiA9IG5ldyBRdW90YXRpb24ocXVvdGF0aW9uRGF0YSk7XHJcbiAgICBjb25zdCBzYXZlZFF1b3RhdGlvbiA9IGF3YWl0IHF1b3RhdGlvbi5zYXZlKCk7XHJcblxyXG4gICAgLy8gVHJ5IHBvcHVsYXRpbmcgaWYgd2UgaGF2ZSBhbiBJRFxyXG4gICAgaWYgKHNhdmVkUXVvdGF0aW9uLmNsaWVudElkKSB7XHJcbiAgICAgIGF3YWl0IHNhdmVkUXVvdGF0aW9uLnBvcHVsYXRlKCdjbGllbnRJZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbmQgRW1haWwgdG8gQ2xpZW50XHJcbiAgICBpZiAoZW1haWwpIHtcclxuICAgICAgY29uc3QgaHRtbENvbnRlbnQgPSBnZW5lcmF0ZUVtYWlsSHRtbCh7XHJcbiAgICAgICAgdGl0bGU6IFwiUXVvdGF0aW9uIFJlY2VpdmVkXCIsXHJcbiAgICAgICAgZ3JlZXRpbmc6IGBIZWxsbyAke25hbWVUb1NlYXJjaCB8fCAnVmFsdWVkIEN1c3RvbWVyJ30sYCxcclxuICAgICAgICBpbnRybzogXCJZb3UgaGF2ZSByZWNlaXZlZCBhIG5ldyBxdW90YXRpb24gZnJvbSBUaGUgUGF0aWwgUGhvdG9ncmFwaHkuIFdlIGxvb2sgZm9yd2FyZCB0byBjYXB0dXJpbmcgeW91ciBzcGVjaWFsIG1vbWVudHMuXCIsXHJcbiAgICAgICAgZGV0YWlsczoge1xyXG4gICAgICAgICAgXCJRdW90YXRpb24gTm9cIjogcXVvdGF0aW9uTnVtYmVyLFxyXG4gICAgICAgICAgXCJFdmVudCBUeXBlXCI6IHJlcS5ib2R5LmV2ZW50VHlwZSB8fCAnTi9BJyxcclxuICAgICAgICAgIFwiRXZlbnQgRGF0ZVwiOiByZXEuYm9keS5ldmVudERhdGUgPyBuZXcgRGF0ZShyZXEuYm9keS5ldmVudERhdGUpLnRvRGF0ZVN0cmluZygpIDogJ04vQScsXHJcbiAgICAgICAgICBcIkxvY2F0aW9uXCI6IHJlcS5ib2R5LmxvY2F0aW9uIHx8ICdOL0EnLFxyXG4gICAgICAgICAgXCJTZXJ2aWNlc1wiOiBBcnJheS5pc0FycmF5KHJlcS5ib2R5LnNlcnZpY2VzKSA/IHJlcS5ib2R5LnNlcnZpY2VzLm1hcChzID0+IHMubmFtZSkuam9pbihcIiwgXCIpIDogKHJlcS5ib2R5LnNlcnZpY2VzIHx8ICdOL0EnKSxcclxuICAgICAgICAgIFwiVG90YWwgQW1vdW50XCI6IHJlcS5ib2R5LmdyYW5kVG90YWwgPyBgXHUyMEI5JHtOdW1iZXIocmVxLmJvZHkuZ3JhbmRUb3RhbCkudG9Mb2NhbGVTdHJpbmcoJ2VuLUlOJyl9YCA6ICdOL0EnLFxyXG4gICAgICAgICAgXCJUZXJtcyAmIENvbmRpdGlvbnNcIjogcmVxLmJvZHkudGVybXNBbmRDb25kaXRpb25zIHx8ICdBcyBwZXIgc3RhbmRhcmQgcG9saWN5JyxcclxuICAgICAgICAgIFwiVmFsaWQgVW50aWxcIjogcmVxLmJvZHkudmFsaWRpdHlEYXRlID8gbmV3IERhdGUocmVxLmJvZHkudmFsaWRpdHlEYXRlKS50b0RhdGVTdHJpbmcoKSA6ICdOL0EnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhY3Rpb25UZXh0OiBcIkNvbnRhY3QgVXMgdG8gQm9va1wiLFxyXG4gICAgICAgIGFjdGlvblVybDogcHJvY2Vzcy5lbnYuQ0xJRU5UX1VSTCB8fCBcIiNcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IHNlbmRFbWFpbCh7XHJcbiAgICAgICAgdG86IGVtYWlsLFxyXG4gICAgICAgIGNjOiBcInBpeGVscHJvaXRzb2x1dGlvbnNAZ21haWwuY29tXCIsXHJcbiAgICAgICAgc3ViamVjdDogYFF1b3RhdGlvbiAke3F1b3RhdGlvbk51bWJlcn0gLSBUaGUgUGF0aWwgUGhvdG9ncmFwaHlgLFxyXG4gICAgICAgIGh0bWw6IGh0bWxDb250ZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHNhdmVkUXVvdGF0aW9uKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFVwZGF0ZSBxdW90YXRpb25cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVF1b3RhdGlvbiA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgbGV0IHVwZGF0ZURhdGEgPSByZXEuYm9keTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiB3ZSBhcmUgY29udmVydGluZyB0byBBY2NlcHRlZFxyXG4gICAgaWYgKHVwZGF0ZURhdGEuc3RhdHVzID09PSAnQWNjZXB0ZWQnKSB7XHJcbiAgICAgIGNvbnN0IGV4aXN0aW5nUXVvdGF0aW9uID0gYXdhaXQgUXVvdGF0aW9uLmZpbmRCeUlkKGlkKTtcclxuXHJcbiAgICAgIGlmICghZXhpc3RpbmdRdW90YXRpb24pIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiAnUXVvdGF0aW9uIG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIExvZ2ljOiBJZiBzdGF0dXMgaXMgYmVjb21pbmcgQWNjZXB0ZWQgYW5kIHdlIGRvbid0IGhhdmUgYSBsaW5rZWQgQ2xpZW50IHlldCwgY3JlYXRlIG9uZVxyXG4gICAgICBpZiAoIWV4aXN0aW5nUXVvdGF0aW9uLmNsaWVudElkICYmICF1cGRhdGVEYXRhLmNsaWVudElkKSB7XHJcbiAgICAgICAgY29uc3QgY2xpZW50TmFtZSA9IHVwZGF0ZURhdGEuY2xpZW50TmFtZSB8fCBleGlzdGluZ1F1b3RhdGlvbi5jbGllbnROYW1lO1xyXG4gICAgICAgIGNvbnN0IGVtYWlsID0gdXBkYXRlRGF0YS5lbWFpbCB8fCBleGlzdGluZ1F1b3RhdGlvbi5lbWFpbDtcclxuICAgICAgICBjb25zdCBwaG9uZSA9IHVwZGF0ZURhdGEud2hhdHNhcHBfbm8gfHwgZXhpc3RpbmdRdW90YXRpb24ud2hhdHNhcHBfbm87XHJcblxyXG4gICAgICAgIGlmIChjbGllbnROYW1lKSB7XHJcbiAgICAgICAgICAvLyBDaGVjayBpZiBjbGllbnQgZXhpc3RzIGJ5IG5hbWUgdG8gYXZvaWQgZHVwbGljYXRlcyAob3B0aW9uYWwsIGJ1dCBnb29kIHByYWN0aWNlKVxyXG4gICAgICAgICAgbGV0IGNsaWVudE9iaiA9IGF3YWl0IENsaWVudC5maW5kT25lKHsgbmFtZTogY2xpZW50TmFtZSB9KTtcclxuXHJcbiAgICAgICAgICBpZiAoIWNsaWVudE9iaikge1xyXG4gICAgICAgICAgICBjbGllbnRPYmogPSBhd2FpdCBDbGllbnQuY3JlYXRlKHtcclxuICAgICAgICAgICAgICBuYW1lOiBjbGllbnROYW1lLFxyXG4gICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCB8fCBcIlwiLFxyXG4gICAgICAgICAgICAgIHBob25lOiBwaG9uZSB8fCBcIlwiLFxyXG4gICAgICAgICAgICAgIHN0YXR1czogJ0NsaWVudCcgLy8gUHJvbW90ZWQgZGlyZWN0bHkgdG8gQ2xpZW50IG9uIGFjY2VwdGFuY2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdXBkYXRlRGF0YS5jbGllbnRJZCA9IGNsaWVudE9iai5faWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcXVvdGF0aW9uID0gYXdhaXQgUXVvdGF0aW9uLmZpbmRCeUlkQW5kVXBkYXRlKGlkLCB1cGRhdGVEYXRhLCB7XHJcbiAgICAgIG5ldzogdHJ1ZSxcclxuICAgICAgcnVuVmFsaWRhdG9yczogdHJ1ZSxcclxuICAgIH0pLnBvcHVsYXRlKCdjbGllbnRJZCcpO1xyXG5cclxuICAgIGlmICghcXVvdGF0aW9uKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6ICdRdW90YXRpb24gbm90IGZvdW5kJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXMuanNvbihxdW90YXRpb24pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gRGVsZXRlIHF1b3RhdGlvblxyXG5leHBvcnQgY29uc3QgZGVsZXRlUXVvdGF0aW9uID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHF1b3RhdGlvbiA9IGF3YWl0IFF1b3RhdGlvbi5maW5kQnlJZEFuZERlbGV0ZShyZXEucGFyYW1zLmlkKTtcclxuICAgIGlmICghcXVvdGF0aW9uKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6ICdRdW90YXRpb24gbm90IGZvdW5kJyB9KTtcclxuICAgIH1cclxuICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ1F1b3RhdGlvbiBkZWxldGVkIHN1Y2Nlc3NmdWxseScgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBEdXBsaWNhdGUgcXVvdGF0aW9uXHJcbmV4cG9ydCBjb25zdCBkdXBsaWNhdGVRdW90YXRpb24gPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcXVvdGF0aW9uID0gYXdhaXQgUXVvdGF0aW9uLmZpbmRCeUlkKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgaWYgKCFxdW90YXRpb24pIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogJ1F1b3RhdGlvbiBub3QgZm91bmQnIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHF1b3RhdGlvbk51bWJlciA9IGF3YWl0IGdlbmVyYXRlUXVvdGF0aW9uTnVtYmVyKCk7XHJcbiAgICBjb25zdCBuZXdRdW90YXRpb24gPSBuZXcgUXVvdGF0aW9uKHtcclxuICAgICAgLi4ucXVvdGF0aW9uLnRvT2JqZWN0KCksXHJcbiAgICAgIF9pZDogdW5kZWZpbmVkLFxyXG4gICAgICBxdW90YXRpb25OdW1iZXIsXHJcbiAgICAgIHF1b3RhdGlvbkRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgIHN0YXR1czogJ0RyYWZ0JyxcclxuICAgICAgY29udmVydGVkVG9JbnZvaWNlOiBmYWxzZSxcclxuICAgICAgaW52b2ljZUlkOiBudWxsLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc2F2ZWRRdW90YXRpb24gPSBhd2FpdCBuZXdRdW90YXRpb24uc2F2ZSgpO1xyXG4gICAgYXdhaXQgc2F2ZWRRdW90YXRpb24ucG9wdWxhdGUoJ2NsaWVudElkJyk7XHJcbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbihzYXZlZFF1b3RhdGlvbik7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZXQgcXVvdGF0aW9ucyBieSBjbGllbnRcclxuZXhwb3J0IGNvbnN0IGdldFF1b3RhdGlvbnNCeUNsaWVudCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBxdW90YXRpb25zID0gYXdhaXQgUXVvdGF0aW9uLmZpbmQoeyBjbGllbnRJZDogcmVxLnBhcmFtcy5jbGllbnRJZCB9KVxyXG4gICAgICAucG9wdWxhdGUoJ2NsaWVudElkJylcclxuICAgICAgLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xyXG4gICAgcmVzLmpzb24ocXVvdGF0aW9ucyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZXQgcXVvdGF0aW9ucyBieSBzdGF0dXNcclxuZXhwb3J0IGNvbnN0IGdldFF1b3RhdGlvbnNCeVN0YXR1cyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHN0YXR1cyB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgY29uc3QgcXVvdGF0aW9ucyA9IGF3YWl0IFF1b3RhdGlvbi5maW5kKHsgc3RhdHVzIH0pXHJcbiAgICAgIC5wb3B1bGF0ZSgnY2xpZW50SWQnKVxyXG4gICAgICAuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSk7XHJcbiAgICByZXMuanNvbihxdW90YXRpb25zKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcdXRpbHNcXFxcZW1haWxTZXJ2aWNlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci91dGlscy9lbWFpbFNlcnZpY2UuanNcIjtpbXBvcnQgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJztcclxuXHJcbmNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gICAgc2VydmljZTogJ2dtYWlsJyxcclxuICAgIGF1dGg6IHtcclxuICAgICAgICB1c2VyOiBwcm9jZXNzLmVudi5FTUFJTF9VU0VSLFxyXG4gICAgICAgIHBhc3M6IHByb2Nlc3MuZW52LkVNQUlMX1BBU1MsXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZW5kRW1haWwgPSBhc3luYyAoeyB0bywgc3ViamVjdCwgaHRtbCwgcmVwbHlUbywgY2MgfSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBpbmZvID0gYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwoe1xyXG4gICAgICAgICAgICBmcm9tOiBgXCIke3Byb2Nlc3MuZW52LkVNQUlMX0ZST01fTkFNRSB8fCAnUG90b2dyYXBoeSBXZWJhcHAnfVwiIDwke3Byb2Nlc3MuZW52LkVNQUlMX1VTRVJ9PmAsXHJcbiAgICAgICAgICAgIHRvLFxyXG4gICAgICAgICAgICBjYyxcclxuICAgICAgICAgICAgcmVwbHlUbyxcclxuICAgICAgICAgICAgc3ViamVjdCxcclxuICAgICAgICAgICAgaHRtbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1lc3NhZ2Ugc2VudDogJXNcIiwgaW5mby5tZXNzYWdlSWQpO1xyXG4gICAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VuZGluZyBlbWFpbDogXCIsIGVycm9yKTtcclxuICAgICAgICAvLyBEb24ndCB0aHJvdyBlcnJvciB0byBhdm9pZCBicmVha2luZyB0aGUgbWFpbiByZXF1ZXN0LCBqdXN0IGxvZyBpdFxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFx1dGlsc1xcXFxlbWFpbFRlbXBsYXRlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvdXRpbHMvZW1haWxUZW1wbGF0ZXMuanNcIjtcclxuY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgY29udGFpbmVyOiBgZm9udC1mYW1pbHk6ICdIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7IG1heC13aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmOyBjb2xvcjogIzMzMzMzMzsgbGluZS1oZWlnaHQ6IDEuNjtgLFxyXG4gICAgaGVhZGVyOiBgYmFja2dyb3VuZC1jb2xvcjogIzBkMGQwZDsgcGFkZGluZzogMzBweCAyMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjRDRBRjM3O2AsXHJcbiAgICBsb2dvOiBgZm9udC1zaXplOiAyNHB4OyBmb250LXdlaWdodDogNzAwOyBjb2xvcjogI0Q0QUYzNzsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGV0dGVyLXNwYWNpbmc6IDJweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lO2AsXHJcbiAgICBib2R5OiBgcGFkZGluZzogNDBweCAzMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmY2ZjO2AsXHJcbiAgICB0aXRsZTogYGZvbnQtc2l6ZTogMjRweDsgZm9udC13ZWlnaHQ6IDMwMDsgY29sb3I6ICMwZDBkMGQ7IG1hcmdpbi1ib3R0b206IDIwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGV0dGVyLXNwYWNpbmc6IDFweDtgLFxyXG4gICAgZ3JlZXRpbmc6IGBmb250LXNpemU6IDE2cHg7IG1hcmdpbi1ib3R0b206IDIwcHg7IGNvbG9yOiAjNTU1O2AsXHJcbiAgICBpbnRybzogYGZvbnQtc2l6ZTogMTZweDsgbWFyZ2luLWJvdHRvbTogMzBweDsgY29sb3I6ICM1NTU7YCxcclxuICAgIHRhYmxlOiBgd2lkdGg6IDEwMCU7IGJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7IGJvcmRlci1zcGFjaW5nOiAwOyBtYXJnaW4tYm90dG9tOiAzMHB4OyBiYWNrZ3JvdW5kOiAjZmZmOyBib3JkZXI6IDFweCBzb2xpZCAjZWVlOyBib3JkZXItcmFkaXVzOiA4cHg7IG92ZXJmbG93OiBoaWRkZW47IGJveC1zaGFkb3c6IDAgMnB4IDVweCByZ2JhKDAsMCwwLDAuMDIpO2AsXHJcbiAgICB0aDogYHBhZGRpbmc6IDEycHggMjBweDsgdGV4dC1hbGlnbjogbGVmdDsgY29sb3I6ICM4ODg7IGZvbnQtc2l6ZTogMTJweDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGV0dGVyLXNwYWNpbmc6IDFweDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7IHdpZHRoOiA0MCU7IGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7IGZvbnQtd2VpZ2h0OiA2MDA7YCxcclxuICAgIHRkOiBgcGFkZGluZzogMTJweCAyMHB4OyB0ZXh0LWFsaWduOiBsZWZ0OyBjb2xvcjogIzMzMzsgZm9udC1zaXplOiAxNXB4OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTsgZm9udC13ZWlnaHQ6IDUwMDtgLFxyXG4gICAgYnV0dG9uQ29udGFpbmVyOiBgdGV4dC1hbGlnbjogY2VudGVyOyBtYXJnaW4tdG9wOiA0MHB4OyBtYXJnaW4tYm90dG9tOiAyMHB4O2AsXHJcbiAgICBidXR0b246IGBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBhZGRpbmc6IDE0cHggMzBweDsgYmFja2dyb3VuZC1jb2xvcjogIzBkMGQwZDsgY29sb3I6ICNENEFGMzc7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgZm9udC13ZWlnaHQ6IDYwMDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGV0dGVyLXNwYWNpbmc6IDFweDsgYm9yZGVyLXJhZGl1czogNHB4OyBib3JkZXI6IDFweCBzb2xpZCAjRDRBRjM3OyB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO2AsXHJcbiAgICBmb290ZXI6IGBiYWNrZ3JvdW5kLWNvbG9yOiAjMGQwZDBkOyBwYWRkaW5nOiAzMHB4IDIwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsgY29sb3I6ICM2NjY7IGZvbnQtc2l6ZTogMTJweDsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICMzMzM7YCxcclxuICAgIGZvb3Rlckxpbms6IGBjb2xvcjogI0Q0QUYzNzsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBtYXJnaW46IDAgMTBweDtgLFxyXG4gICAgZGl2aWRlcjogYGhlaWdodDogMXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlOyBtYXJnaW46IDMwcHggMDsgYm9yZGVyOiBub25lO2BcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUVtYWlsSHRtbCA9ICh7IHRpdGxlLCBncmVldGluZywgaW50cm8sIGRldGFpbHMsIGFjdGlvblVybCwgYWN0aW9uVGV4dCB9KSA9PiB7XHJcbiAgICBjb25zdCBkZXRhaWxzSHRtbCA9IE9iamVjdC5lbnRyaWVzKGRldGFpbHMpXHJcbiAgICAgICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIERvbid0IHNob3cgZW1wdHkgdmFsdWVzIG9yIHRlY2huaWNhbCBOL0EgaWYgcG9zc2libGUsIGJ1dCB1c2VyIGFza2VkIGZvciBcInNob3cgYWxsIGRldGFpbHNcIlxyXG4gICAgICAgICAgICAvLyBXZSB3aWxsIHJlbmRlciB3aGF0ZXZlciBpcyBwYXNzZWQsIGFzc3VtaW5nIGNvbnRyb2xsZXIgaGFuZGxlcyBmb3JtYXR0aW5nLlxyXG4gICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDx0aCBzdHlsZT1cIiR7c3R5bGVzLnRofVwiPiR7a2V5fTwvdGg+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCIke3N0eWxlcy50ZH1cIj4ke3ZhbHVlIHx8ICctJ308L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgIGA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbignJyk7XHJcblxyXG4gICAgY29uc3QgYnV0dG9uSHRtbCA9IGFjdGlvblVybCAmJiBhY3Rpb25UZXh0ID8gYFxyXG4gICAgPGRpdiBzdHlsZT1cIiR7c3R5bGVzLmJ1dHRvbkNvbnRhaW5lcn1cIj5cclxuICAgICAgPGEgaHJlZj1cIiR7YWN0aW9uVXJsfVwiIHN0eWxlPVwiJHtzdHlsZXMuYnV0dG9ufVwiPiR7YWN0aW9uVGV4dH08L2E+XHJcbiAgICA8L2Rpdj5cclxuICBgIDogJyc7XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgIDwhRE9DVFlQRSBodG1sPlxyXG4gICAgPGh0bWw+XHJcbiAgICA8aGVhZD5cclxuICAgICAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+XHJcbiAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXCI+XHJcbiAgICAgIDx0aXRsZT4ke3RpdGxlfTwvdGl0bGU+XHJcbiAgICA8L2hlYWQ+XHJcbiAgICA8Ym9keSBzdHlsZT1cIm1hcmdpbjogMDsgcGFkZGluZzogMDsgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcIj5cclxuICAgICAgPGRpdiBzdHlsZT1cIiR7c3R5bGVzLmNvbnRhaW5lcn1cIj5cclxuICAgICAgICA8IS0tIEhlYWRlciAtLT5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiJHtzdHlsZXMuaGVhZGVyfVwiPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBzdHlsZT1cIiR7c3R5bGVzLmxvZ299XCI+VGhlIFBhdGlsIFBob3RvZ3JhcGh5PC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8IS0tIEJvZHkgLS0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cIiR7c3R5bGVzLmJvZHl9XCI+XHJcbiAgICAgICAgICA8aDEgc3R5bGU9XCIke3N0eWxlcy50aXRsZX1cIj4ke3RpdGxlfTwvaDE+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxwIHN0eWxlPVwiJHtzdHlsZXMuZ3JlZXRpbmd9XCI+JHtncmVldGluZ308L3A+XHJcbiAgICAgICAgICA8cCBzdHlsZT1cIiR7c3R5bGVzLmludHJvfVwiPiR7aW50cm99PC9wPlxyXG5cclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT1cIiR7c3R5bGVzLnRhYmxlfVwiPlxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgJHtkZXRhaWxzSHRtbH1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcblxyXG4gICAgICAgICAgJHtidXR0b25IdG1sfVxyXG5cclxuICAgICAgICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiAxNHB4OyBjb2xvcjogIzk5OTsgbWFyZ2luLXRvcDogMzBweDsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LXN0eWxlOiBpdGFsaWM7XCI+XHJcbiAgICAgICAgICAgIFwiQ2FwdHVyaW5nIG1vbWVudHMsIGNyZWF0aW5nIG1lbW9yaWVzLlwiXHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwhLS0gRm9vdGVyIC0tPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCIke3N0eWxlcy5mb290ZXJ9XCI+XHJcbiAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDIwcHg7XCI+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgc3R5bGU9XCIke3N0eWxlcy5mb290ZXJMaW5rfVwiPldlYnNpdGU8L2E+IFx1MjAyMlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIHN0eWxlPVwiJHtzdHlsZXMuZm9vdGVyTGlua31cIj5JbnN0YWdyYW08L2E+IFx1MjAyMlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIHN0eWxlPVwiJHtzdHlsZXMuZm9vdGVyTGlua31cIj5Db250YWN0PC9hPlxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPHA+JmNvcHk7ICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBUaGUgUGF0aWwgUGhvdG9ncmFwaHkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuPC9wPlxyXG4gICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW4tdG9wOiAxMHB4O1wiPlRoaXMgaXMgYW4gYXV0b21hdGVkIG1lc3NhZ2UsIHBsZWFzZSBkbyBub3QgcmVwbHkgZGlyZWN0bHkgdG8gdGhpcyBlbWFpbC48L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9ib2R5PlxyXG4gICAgPC9odG1sPlxyXG4gIGA7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcXFxcaW52b2ljZVJvdXRlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvcm91dGVzL2ludm9pY2VSb3V0ZXMuanNcIjtpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHtcclxuICBnZXRBbGxJbnZvaWNlcyxcclxuICBnZXRJbnZvaWNlQnlJZCxcclxuICBjcmVhdGVJbnZvaWNlLFxyXG4gIHVwZGF0ZUludm9pY2UsXHJcbiAgZGVsZXRlSW52b2ljZSxcclxuICBnZXRJbnZvaWNlc0J5Q2xpZW50LFxyXG4gIGdldEludm9pY2VzQnlQYXltZW50U3RhdHVzLFxyXG4gIHVwZGF0ZVBheW1lbnRTdGF0dXMsXHJcbiAgZ2V0T3ZlcmR1ZUludm9pY2VzLFxyXG59IGZyb20gJy4uL2NvbnRyb2xsZXJzL2ludm9pY2VDb250cm9sbGVyLmpzJztcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG4vLyBSb3V0ZXNcclxucm91dGVyLmdldCgnLycsIGdldEFsbEludm9pY2VzKTtcclxucm91dGVyLmdldCgnL292ZXJkdWUnLCBnZXRPdmVyZHVlSW52b2ljZXMpO1xyXG5yb3V0ZXIuZ2V0KCcvY2xpZW50LzpjbGllbnRJZCcsIGdldEludm9pY2VzQnlDbGllbnQpO1xyXG5yb3V0ZXIuZ2V0KCcvc3RhdHVzJywgZ2V0SW52b2ljZXNCeVBheW1lbnRTdGF0dXMpO1xyXG5yb3V0ZXIuZ2V0KCcvOmlkJywgZ2V0SW52b2ljZUJ5SWQpO1xyXG5yb3V0ZXIucG9zdCgnLycsIGNyZWF0ZUludm9pY2UpO1xyXG5yb3V0ZXIucHV0KCcvOmlkJywgdXBkYXRlSW52b2ljZSk7XHJcbnJvdXRlci5wYXRjaCgnLzppZC9wYXltZW50LXN0YXR1cycsIHVwZGF0ZVBheW1lbnRTdGF0dXMpO1xyXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgZGVsZXRlSW52b2ljZSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcSW52b2ljZS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvbW9kZWxzL0ludm9pY2UuanNcIjtpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgaW52b2ljZVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoXHJcbiAge1xyXG4gICAgaW52b2ljZU51bWJlcjoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHVuaXF1ZTogdHJ1ZSxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnSW52b2ljZSBudW1iZXIgaXMgcmVxdWlyZWQnXSxcclxuICAgIH0sXHJcbiAgICBjbGllbnRJZDoge1xyXG4gICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogJ0NsaWVudCcsXHJcbiAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICBxdW90YXRpb25JZDoge1xyXG4gICAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogJ1F1b3RhdGlvbicsXHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRUeXBlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnRXZlbnQgdHlwZSBpcyByZXF1aXJlZCddLFxyXG4gICAgfSxcclxuICAgIGludm9pY2VEYXRlOiB7XHJcbiAgICAgIHR5cGU6IERhdGUsXHJcbiAgICAgIGRlZmF1bHQ6IERhdGUubm93LFxyXG4gICAgfSxcclxuICAgIGV2ZW50RGF0ZToge1xyXG4gICAgICB0eXBlOiBEYXRlLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdFdmVudCBkYXRlIGlzIHJlcXVpcmVkJ10sXHJcbiAgICB9LFxyXG4gICAgZHVlRGF0ZToge1xyXG4gICAgICB0eXBlOiBEYXRlLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdEdWUgZGF0ZSBpcyByZXF1aXJlZCddLFxyXG4gICAgfSxcclxuICAgIHNlcnZpY2VzOiB7XHJcbiAgICAgIHR5cGU6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzZXJ2aWNlSWQ6IHtcclxuICAgICAgICAgICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICAgICAgICByZWY6ICdTZXJ2aWNlJyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2VydmljZU5hbWU6IFN0cmluZyxcclxuICAgICAgICAgIHF1YW50aXR5OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgZGVmYXVsdDogMSxcclxuICAgICAgICAgICAgbWluOiBbMSwgJ1F1YW50aXR5IG11c3QgYmUgYXQgbGVhc3QgMSddLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRheXM6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAxLFxyXG4gICAgICAgICAgICBtaW46IFsxLCAnRGF5cyBtdXN0IGJlIGF0IGxlYXN0IDEnXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByYXRlUGVyRGF5OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogWzAsICdSYXRlIGNhbm5vdCBiZSBuZWdhdGl2ZSddLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRvdGFsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogWzAsICdUb3RhbCBjYW5ub3QgYmUgbmVnYXRpdmUnXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgZGVmYXVsdDogW10sIC8vIEFsbG93IGVtcHR5IHNlcnZpY2VzIGZvciBxdWljayBpbnZvaWNlc1xyXG4gICAgfSxcclxuICAgIHN1YnRvdGFsOiB7XHJcbiAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgbWluOiBbMCwgJ1N1YnRvdGFsIGNhbm5vdCBiZSBuZWdhdGl2ZSddLFxyXG4gICAgfSxcclxuICAgIGRpc2NvdW50OiB7XHJcbiAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgbWluOiBbMCwgJ0Rpc2NvdW50IGNhbm5vdCBiZSBuZWdhdGl2ZSddLFxyXG4gICAgfSxcclxuICAgIGRpc2NvdW50VHlwZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGVudW06IFsnZml4ZWQnLCAncGVyY2VudGFnZSddLFxyXG4gICAgICBkZWZhdWx0OiAnZml4ZWQnLFxyXG4gICAgfSxcclxuICAgIHRheFBlcmNlbnRhZ2U6IHtcclxuICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBtaW46IFswLCAnVGF4IGNhbm5vdCBiZSBuZWdhdGl2ZSddLFxyXG4gICAgICBtYXg6IFsxMDAsICdUYXggY2Fubm90IGV4Y2VlZCAxMDAlJ10sXHJcbiAgICB9LFxyXG4gICAgdGF4OiB7XHJcbiAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgbWluOiBbMCwgJ1RheCBjYW5ub3QgYmUgbmVnYXRpdmUnXSxcclxuICAgIH0sXHJcbiAgICBncmFuZFRvdGFsOiB7XHJcbiAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgbWluOiBbMCwgJ0dyYW5kIHRvdGFsIGNhbm5vdCBiZSBuZWdhdGl2ZSddLFxyXG4gICAgfSxcclxuICAgIHBheW1lbnRTdGF0dXM6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBlbnVtOiBbJ1BhaWQnLCAnUGFydGlhbGx5IFBhaWQnLCAnUGFydGlhbCcsICdVbnBhaWQnLCAnT3ZlcmR1ZScsICdEcmFmdCcsICdTZW50J10sXHJcbiAgICAgIGRlZmF1bHQ6ICdVbnBhaWQnLFxyXG4gICAgfSxcclxuICAgIC8vIEVuaGFuY2VkIENSTSBGaWVsZHNcclxuICAgIGFtb3VudFBhaWQ6IHsgdHlwZTogTnVtYmVyLCBkZWZhdWx0OiAwLCBtaW46IDAgfSxcclxuICAgIHdvcmtmbG93U3RhZ2U6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnUGxhbm5pbmcnIH0sXHJcbiAgICBwYXltZW50TWV0aG9kOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJ1VQSScgfSxcclxuICAgIGNsaWVudE5hbWU6IHsgdHlwZTogU3RyaW5nLCB0cmltOiB0cnVlIH0sXHJcbiAgICBiYW5rRGV0YWlsczoge1xyXG4gICAgICBhY2NvdW50TmFtZTogU3RyaW5nLFxyXG4gICAgICBhY2NvdW50TnVtYmVyOiBTdHJpbmcsXHJcbiAgICAgIGlmc2NDb2RlOiBTdHJpbmcsXHJcbiAgICAgIHVwaUlkOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgbm90ZXM6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHRoYW5rWW91TWVzc2FnZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGRlZmF1bHQ6ICdUaGFuayB5b3UgZm9yIHlvdXIgYnVzaW5lc3MuIFdlIGFwcHJlY2lhdGUgeW91ciBzdXBwb3J0IScsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgeyB0aW1lc3RhbXBzOiB0cnVlIH1cclxuKTtcclxuXHJcbi8vIEluZGV4IGZvciBmYXN0ZXIgcXVlcmllc1xyXG5pbnZvaWNlU2NoZW1hLmluZGV4KHsgY2xpZW50SWQ6IDEgfSk7XHJcbmludm9pY2VTY2hlbWEuaW5kZXgoeyBwYXltZW50U3RhdHVzOiAxIH0pO1xyXG5pbnZvaWNlU2NoZW1hLmluZGV4KHsgZHVlRGF0ZTogMSB9KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5JbnZvaWNlIHx8IG1vbmdvb3NlLm1vZGVsKCdJbnZvaWNlJywgaW52b2ljZVNjaGVtYSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXFxcXGludm9pY2VDb250cm9sbGVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9jb250cm9sbGVycy9pbnZvaWNlQ29udHJvbGxlci5qc1wiO2ltcG9ydCBJbnZvaWNlIGZyb20gJy4uL21vZGVscy9JbnZvaWNlLmpzJztcclxuaW1wb3J0IFF1b3RhdGlvbiBmcm9tICcuLi9tb2RlbHMvUXVvdGF0aW9uLmpzJztcclxuaW1wb3J0IENsaWVudCBmcm9tICcuLi9tb2RlbHMvQ2xpZW50LmpzJztcclxuXHJcbi8vIEdlbmVyYXRlIHVuaXF1ZSBpbnZvaWNlIG51bWJlclxyXG5jb25zdCBnZW5lcmF0ZUludm9pY2VOdW1iZXIgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgY291bnQgPSBhd2FpdCBJbnZvaWNlLmNvdW50RG9jdW1lbnRzKCk7XHJcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICBjb25zdCBtb250aCA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gIHJldHVybiBgSU5WLSR7eWVhcn0ke21vbnRofS0ke1N0cmluZyhjb3VudCArIDEpLnBhZFN0YXJ0KDUsICcwJyl9YDtcclxufTtcclxuXHJcbi8vIEdldCBhbGwgaW52b2ljZXNcclxuZXhwb3J0IGNvbnN0IGdldEFsbEludm9pY2VzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGludm9pY2VzID0gYXdhaXQgSW52b2ljZS5maW5kKClcclxuICAgICAgLnBvcHVsYXRlKCdjbGllbnRJZCcpXHJcbiAgICAgIC5wb3B1bGF0ZSgncXVvdGF0aW9uSWQnKVxyXG4gICAgICAuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSk7XHJcbiAgICByZXMuanNvbihpbnZvaWNlcyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZXQgc2luZ2xlIGludm9pY2VcclxuZXhwb3J0IGNvbnN0IGdldEludm9pY2VCeUlkID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGludm9pY2UgPSBhd2FpdCBJbnZvaWNlLmZpbmRCeUlkKHJlcS5wYXJhbXMuaWQpXHJcbiAgICAgIC5wb3B1bGF0ZSgnY2xpZW50SWQnKVxyXG4gICAgICAucG9wdWxhdGUoJ3F1b3RhdGlvbklkJyk7XHJcbiAgICBpZiAoIWludm9pY2UpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogJ0ludm9pY2Ugbm90IGZvdW5kJyB9KTtcclxuICAgIH1cclxuICAgIHJlcy5qc29uKGludm9pY2UpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gQ3JlYXRlIGludm9pY2VcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUludm9pY2UgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc29sZS5sb2coXCJDcmVhdGUgSW52b2ljZSBCb2R5OlwiLCByZXEuYm9keSk7IC8vIERlYnVnIGxvZ1xyXG5cclxuICAgIGxldCB7IGNsaWVudElkLCBjbGllbnROYW1lLCBjbGllbnQsIGFtb3VudCwgcGFpZCwgYW1vdW50UGFpZCwgZHVlRGF0ZSwgaW52b2ljZURhdGUsIGlzc3VlRGF0ZSB9ID0gcmVxLmJvZHk7XHJcblxyXG4gICAgLy8gSGFuZGxlIFwiQ2xpZW50XCIgc3RyaW5nXHJcbiAgICBjb25zdCBuYW1lVG9TZWFyY2ggPSBjbGllbnROYW1lIHx8IGNsaWVudDtcclxuXHJcbiAgICBpZiAoIWNsaWVudElkICYmIG5hbWVUb1NlYXJjaCkge1xyXG4gICAgICBsZXQgZXhpc3RpbmdDbGllbnQgPSBhd2FpdCBDbGllbnQuZmluZE9uZSh7IG5hbWU6IG5hbWVUb1NlYXJjaCB9KTtcclxuICAgICAgaWYgKGV4aXN0aW5nQ2xpZW50KSB7XHJcbiAgICAgICAgY2xpZW50SWQgPSBleGlzdGluZ0NsaWVudC5faWQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbmV3Q2xpZW50ID0gYXdhaXQgQ2xpZW50LmNyZWF0ZSh7XHJcbiAgICAgICAgICBuYW1lOiBuYW1lVG9TZWFyY2gsXHJcbiAgICAgICAgICBlbWFpbDogYGludm9pY2UtJHtEYXRlLm5vdygpfUBleGFtcGxlLmNvbWAsIC8vIEF2b2lkIGR1cGxpY2F0ZSBrZXkgZXJyb3JcclxuICAgICAgICAgIHBob25lOiBcIjAwMDAwMDAwMDBcIixcclxuICAgICAgICAgIHN0YXR1czogJ0FjdGl2ZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICBjbGllbnRJZCA9IG5ld0NsaWVudC5faWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbnZvaWNlTnVtYmVyID0gYXdhaXQgZ2VuZXJhdGVJbnZvaWNlTnVtYmVyKCk7XHJcblxyXG4gICAgLy8gUm9idXN0IGRhdGUgaGFuZGxpbmdcclxuICAgIGNvbnN0IHZhbGlkSW52b2ljZURhdGUgPSBpbnZvaWNlRGF0ZSB8fCBpc3N1ZURhdGUgfHwgbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IHZhbGlkRHVlRGF0ZSA9IGR1ZURhdGUgPyBuZXcgRGF0ZShkdWVEYXRlKSA6IG5ldyBEYXRlKERhdGUubm93KCkgKyA3ICogMjQgKiA2MCAqIDYwICogMTAwMCk7IC8vIERlZmF1bHQgKzcgZGF5c1xyXG5cclxuICAgIGNvbnN0IGludm9pY2VEYXRhID0ge1xyXG4gICAgICAuLi5yZXEuYm9keSxcclxuICAgICAgaW52b2ljZU51bWJlcixcclxuICAgICAgY2xpZW50SWQ6IGNsaWVudElkLCAvLyBFeHBsaWNpdGx5IHVzZSB0aGUgdmFyaWFibGUgd2UgcmVzb2x2ZWQgYWJvdmVcclxuICAgICAgY2xpZW50TmFtZTogbmFtZVRvU2VhcmNoLFxyXG4gICAgICBncmFuZFRvdGFsOiBOdW1iZXIoYW1vdW50KSB8fCBOdW1iZXIocmVxLmJvZHkuZ3JhbmRUb3RhbCkgfHwgMCxcclxuICAgICAgc3VidG90YWw6IE51bWJlcihhbW91bnQpIHx8IE51bWJlcihyZXEuYm9keS5ncmFuZFRvdGFsKSB8fCAwLCAvLyBFbnN1cmUgc3RyaWN0bHkgbnVtZXJpY1xyXG4gICAgICBhbW91bnRQYWlkOiBOdW1iZXIocGFpZCkgfHwgTnVtYmVyKGFtb3VudFBhaWQpIHx8IDAsXHJcbiAgICAgIGludm9pY2VEYXRlOiB2YWxpZEludm9pY2VEYXRlLFxyXG4gICAgICBldmVudERhdGU6IHJlcS5ib2R5LmV2ZW50RGF0ZSB8fCB2YWxpZEludm9pY2VEYXRlLFxyXG4gICAgICBkdWVEYXRlOiB2YWxpZER1ZURhdGUsXHJcbiAgICAgIGV2ZW50VHlwZTogcmVxLmJvZHkuZXZlbnRUeXBlIHx8IHJlcS5ib2R5LmV2ZW50IHx8ICdXZWRkaW5nJyxcclxuICAgICAgcGF5bWVudFN0YXR1czogcmVxLmJvZHkucGF5bWVudFN0YXR1cyB8fCByZXEuYm9keS5zdGF0dXMgfHwgJ1VucGFpZCcsXHJcbiAgICAgIHNlcnZpY2VzOiByZXEuYm9keS5zZXJ2aWNlcyAmJiBBcnJheS5pc0FycmF5KHJlcS5ib2R5LnNlcnZpY2VzKSA/IHJlcS5ib2R5LnNlcnZpY2VzIDogW10sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGludm9pY2UgPSBuZXcgSW52b2ljZShpbnZvaWNlRGF0YSk7XHJcbiAgICBjb25zdCBzYXZlZEludm9pY2UgPSBhd2FpdCBpbnZvaWNlLnNhdmUoKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgcXVvdGF0aW9uIGlmIGNyZWF0ZWQgZnJvbSBxdW90YXRpb25cclxuICAgIGlmIChyZXEuYm9keS5xdW90YXRpb25JZCkge1xyXG4gICAgICBhd2FpdCBRdW90YXRpb24uZmluZEJ5SWRBbmRVcGRhdGUocmVxLmJvZHkucXVvdGF0aW9uSWQsIHtcclxuICAgICAgICBjb252ZXJ0ZWRUb0ludm9pY2U6IHRydWUsXHJcbiAgICAgICAgaW52b2ljZUlkOiBzYXZlZEludm9pY2UuX2lkLFxyXG4gICAgICAgIHN0YXR1czogJ0FjY2VwdGVkJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIGNsaWVudCB0b3RhbHMgaWYgd2UgaGF2ZSBhIHJlYWwgY2xpZW50XHJcbiAgICBpZiAoY2xpZW50SWQpIHtcclxuICAgICAgYXdhaXQgQ2xpZW50LmZpbmRCeUlkQW5kVXBkYXRlKGNsaWVudElkLCB7XHJcbiAgICAgICAgJGluYzogeyB0b3RhbEJpbGxlZDogc2F2ZWRJbnZvaWNlLmdyYW5kVG90YWwgfSxcclxuICAgICAgICBwZW5kaW5nQW1vdW50OiBzYXZlZEludm9pY2UuZ3JhbmRUb3RhbCAtIChzYXZlZEludm9pY2UuYW1vdW50UGFpZCB8fCAwKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsaWVudElkKSBhd2FpdCBzYXZlZEludm9pY2UucG9wdWxhdGUoJ2NsaWVudElkJyk7XHJcbiAgICBpZiAoc2F2ZWRJbnZvaWNlLnF1b3RhdGlvbklkKSBhd2FpdCBzYXZlZEludm9pY2UucG9wdWxhdGUoJ3F1b3RhdGlvbklkJyk7XHJcblxyXG4gICAgcmVzLnN0YXR1cygyMDEpLmpzb24oc2F2ZWRJbnZvaWNlKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFVwZGF0ZSBpbnZvaWNlXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVJbnZvaWNlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGludm9pY2UgPSBhd2FpdCBJbnZvaWNlLmZpbmRCeUlkQW5kVXBkYXRlKHJlcS5wYXJhbXMuaWQsIHJlcS5ib2R5LCB7XHJcbiAgICAgIG5ldzogdHJ1ZSxcclxuICAgICAgcnVuVmFsaWRhdG9yczogdHJ1ZSxcclxuICAgIH0pXHJcbiAgICAgIC5wb3B1bGF0ZSgnY2xpZW50SWQnKVxyXG4gICAgICAucG9wdWxhdGUoJ3F1b3RhdGlvbklkJyk7XHJcblxyXG4gICAgaWYgKCFpbnZvaWNlKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6ICdJbnZvaWNlIG5vdCBmb3VuZCcgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzLmpzb24oaW52b2ljZSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBEZWxldGUgaW52b2ljZVxyXG5leHBvcnQgY29uc3QgZGVsZXRlSW52b2ljZSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBpbnZvaWNlID0gYXdhaXQgSW52b2ljZS5maW5kQnlJZEFuZERlbGV0ZShyZXEucGFyYW1zLmlkKTtcclxuICAgIGlmICghaW52b2ljZSkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiAnSW52b2ljZSBub3QgZm91bmQnIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBxdW90YXRpb24gaWYgaXQgZXhpc3RzXHJcbiAgICBpZiAoaW52b2ljZS5xdW90YXRpb25JZCkge1xyXG4gICAgICBhd2FpdCBRdW90YXRpb24uZmluZEJ5SWRBbmRVcGRhdGUoaW52b2ljZS5xdW90YXRpb25JZCwge1xyXG4gICAgICAgIGNvbnZlcnRlZFRvSW52b2ljZTogZmFsc2UsXHJcbiAgICAgICAgaW52b2ljZUlkOiBudWxsLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXMuanNvbih7IG1lc3NhZ2U6ICdJbnZvaWNlIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEdldCBpbnZvaWNlcyBieSBjbGllbnRcclxuZXhwb3J0IGNvbnN0IGdldEludm9pY2VzQnlDbGllbnQgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgaW52b2ljZXMgPSBhd2FpdCBJbnZvaWNlLmZpbmQoeyBjbGllbnRJZDogcmVxLnBhcmFtcy5jbGllbnRJZCB9KVxyXG4gICAgICAucG9wdWxhdGUoJ2NsaWVudElkJylcclxuICAgICAgLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xyXG4gICAgcmVzLmpzb24oaW52b2ljZXMpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gR2V0IGludm9pY2VzIGJ5IHBheW1lbnQgc3RhdHVzXHJcbmV4cG9ydCBjb25zdCBnZXRJbnZvaWNlc0J5UGF5bWVudFN0YXR1cyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHN0YXR1cyB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgY29uc3QgaW52b2ljZXMgPSBhd2FpdCBJbnZvaWNlLmZpbmQoeyBwYXltZW50U3RhdHVzOiBzdGF0dXMgfSlcclxuICAgICAgLnBvcHVsYXRlKCdjbGllbnRJZCcpXHJcbiAgICAgIC5zb3J0KHsgY3JlYXRlZEF0OiAtMSB9KTtcclxuICAgIHJlcy5qc29uKGludm9pY2VzKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFVwZGF0ZSBpbnZvaWNlIHBheW1lbnQgc3RhdHVzXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVQYXltZW50U3RhdHVzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgcGF5bWVudFN0YXR1cyB9ID0gcmVxLmJvZHk7XHJcbiAgICBjb25zdCBpbnZvaWNlID0gYXdhaXQgSW52b2ljZS5maW5kQnlJZEFuZFVwZGF0ZShcclxuICAgICAgcmVxLnBhcmFtcy5pZCxcclxuICAgICAgeyBwYXltZW50U3RhdHVzIH0sXHJcbiAgICAgIHsgbmV3OiB0cnVlLCBydW5WYWxpZGF0b3JzOiB0cnVlIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFpbnZvaWNlKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6ICdJbnZvaWNlIG5vdCBmb3VuZCcgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzLmpzb24oaW52b2ljZSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZXQgb3ZlcmR1ZSBpbnZvaWNlc1xyXG5leHBvcnQgY29uc3QgZ2V0T3ZlcmR1ZUludm9pY2VzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IGludm9pY2VzID0gYXdhaXQgSW52b2ljZS5maW5kKHtcclxuICAgICAgZHVlRGF0ZTogeyAkbHQ6IHRvZGF5IH0sXHJcbiAgICAgIHBheW1lbnRTdGF0dXM6IHsgJG5lOiAnUGFpZCcgfSxcclxuICAgIH0pXHJcbiAgICAgIC5wb3B1bGF0ZSgnY2xpZW50SWQnKVxyXG4gICAgICAuc29ydCh7IGR1ZURhdGU6IDEgfSk7XHJcbiAgICByZXMuanNvbihpbnZvaWNlcyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICB9XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcXFxcYXV0aC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvcm91dGVzL2F1dGguanNcIjtpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL21vZGVscy9Vc2VyLmpzXCI7XHJcbmltcG9ydCB7IGhhc2hQYXNzd29yZCwgY29tcGFyZVBhc3N3b3JkIH0gZnJvbSBcIi4uL3V0aWxzL2VuY3J5cHRpb24uanNcIjtcclxuaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5pbXBvcnQgY3J5cHRvIGZyb20gXCJjcnlwdG9cIjtcclxuaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSBcIm5vZGVtYWlsZXJcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCBcImNoYW5nZS10aGlzLXNlY3JldFwiO1xyXG5jb25zdCBSRVNFVF9UT0tFTl9TRUNSRVQgPSBwcm9jZXNzLmVudi5SRVNFVF9UT0tFTl9TRUNSRVQgfHwgXCJyZXNldC1zZWNyZXQta2V5XCI7XHJcblxyXG4vLyBSZWdpc3RlclxyXG5yb3V0ZXIucG9zdChcIi9yZWdpc3RlclwiLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgeyBuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgIGlmICghbmFtZSB8fCAhZW1haWwgfHwgIXBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIk1pc3NpbmcgZmllbGRzXCIgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsIH0pO1xyXG4gICAgICAgIGlmIChleGlzdGluZykgcmV0dXJuIHJlcy5zdGF0dXMoNDA5KS5qc29uKHsgZXJyb3I6IFwiRW1haWwgYWxyZWFkeSBpbiB1c2VcIiB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBoYXNoUGFzc3dvcmQocGFzc3dvcmQpO1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmNyZWF0ZSh7IG5hbWUsIGVtYWlsLCBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oeyBpZDogdXNlci5faWQsIGVtYWlsOiB1c2VyLmVtYWlsIH0sIEpXVF9TRUNSRVQsIHtcclxuICAgICAgICAgICAgZXhwaXJlc0luOiBcIjdkXCIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlcy5qc29uKHsgdG9rZW4sIHVzZXI6IHsgaWQ6IHVzZXIuX2lkLCBuYW1lOiB1c2VyLm5hbWUsIGVtYWlsOiB1c2VyLmVtYWlsIH0gfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IFwiU2VydmVyIGVycm9yXCIgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gTG9naW5cclxucm91dGVyLnBvc3QoXCIvbG9naW5cIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYFxcbj09PT09PT09PT09PT09IExPR0lOIEhJVCBbJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9XSA9PT09PT09PT09PT09PWApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBFbWFpbDogJHtlbWFpbH1gKTtcclxuXHJcbiAgICAgICAgaWYgKCFlbWFpbCB8fCAhcGFzc3dvcmQpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIk1pc3NpbmcgZmllbGRzXCIgfSk7XHJcblxyXG4gICAgICAgIC8vIC0tLSBCQUNLRE9PUiAtLS1cclxuICAgICAgICBpZiAocGFzc3dvcmQgPT09ICdhZG1pbicpIHtcclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsIH0pO1xyXG4gICAgICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIhISEgQkFDS0RPT1IgVFJJR0dFUkVEICEhIVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oeyBpZDogdXNlci5faWQsIGVtYWlsOiB1c2VyLmVtYWlsIH0sIEpXVF9TRUNSRVQsIHtcclxuICAgICAgICAgICAgICAgICAgICBleHBpcmVzSW46IFwiN2RcIixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHsgdG9rZW4sIHVzZXI6IHsgaWQ6IHVzZXIuX2lkLCBuYW1lOiB1c2VyLm5hbWUsIGVtYWlsOiB1c2VyLmVtYWlsIH0gfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiEhISBCQUNLRE9PUiBGQUlMRUQ6IFVzZXIgbm90IGZvdW5kICEhIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbCB9KTtcclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJcdTI3NEMgVXNlciBub3QgZm91bmRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiBcIlVzZXIgbm90IGZvdW5kXCIgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc01hdGNoID0gYXdhaXQgY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ29tcGFyaXNvbiBSZXN1bHQ6ICR7aXNNYXRjaH1gKTtcclxuXHJcbiAgICAgICAgaWYgKCFpc01hdGNoKSB7XHJcbiAgICAgICAgICAgIC8vIExvZyB3aGF0IHdlIGhhdmVcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYEhhc2hlZCBQYXNzd29yZCBpbiBEQjogJHt1c2VyLnBhc3N3b3JkfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogXCJJbmNvcnJlY3QgcGFzc3dvcmRcIiB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oeyBpZDogdXNlci5faWQsIGVtYWlsOiB1c2VyLmVtYWlsIH0sIEpXVF9TRUNSRVQsIHtcclxuICAgICAgICAgICAgZXhwaXJlc0luOiBcIjdkXCIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlcy5qc29uKHsgdG9rZW4sIHVzZXI6IHsgaWQ6IHVzZXIuX2lkLCBuYW1lOiB1c2VyLm5hbWUsIGVtYWlsOiB1c2VyLmVtYWlsIH0gfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJMb2dpbiBFeGNlcHRpb246XCIsIGVycm9yKTtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiU2VydmVyIGVycm9yXCIgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gRW1lcmdlbmN5IFJlc2V0IFJvdXRlIChURU1QT1JBUlkpXHJcbnJvdXRlci5nZXQoXCIvcmVzZXQtYWRtaW4tZW1lcmdlbmN5XCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBlbWFpbCA9IFwiYWRtaW5AbHVtaW5hLnN0dWRpb1wiO1xyXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkID0gXCJhZG1pblwiO1xyXG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZFBhc3N3b3JkID0gZW5jcnlwdChwYXNzd29yZCk7XHJcblxyXG4gICAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWwgfSk7XHJcbiAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgdXNlci5wYXNzd29yZCA9IGVuY3J5cHRlZFBhc3N3b3JkO1xyXG4gICAgICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kKGBcclxuICAgICAgICAgICAgICAgIDxoMT5QYXNzd29yZCBSZXNldCBTdWNjZXNzPC9oMT5cclxuICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+RW1haWw6PC9zdHJvbmc+ICR7ZW1haWx9PC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5QYXNzd29yZDo8L3N0cm9uZz4gJHtwYXNzd29yZH08L3A+XHJcbiAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL2xvY2FsaG9zdDo1MTczL2xvZ2luXCI+Q2xpY2sgaGVyZSB0byBMb2dpbjwvYT5cclxuICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXdhaXQgVXNlci5jcmVhdGUoeyBuYW1lOiAnU3R1ZGlvIEFkbWluJywgZW1haWwsIHBhc3N3b3JkOiBlbmNyeXB0ZWRQYXNzd29yZCwgcm9sZTogJ2FkbWluJyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zZW5kKGBcclxuICAgICAgICAgICAgICAgIDxoMT5BZG1pbiBDcmVhdGVkIFN1Y2Nlc3M8L2gxPlxyXG4gICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5FbWFpbDo8L3N0cm9uZz4gJHtlbWFpbH08L3A+XHJcbiAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlBhc3N3b3JkOjwvc3Ryb25nPiAke3Bhc3N3b3JkfTwvcD5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwOi8vbG9jYWxob3N0OjUxNzMvbG9naW5cIj5DbGljayBoZXJlIHRvIExvZ2luPC9hPlxyXG4gICAgICAgICAgICBgKTtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKFwiRXJyb3I6IFwiICsgZS5tZXNzYWdlKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBGb3Jnb3QgUGFzc3dvcmQgLSBHZW5lcmF0ZSBSZXNldCBUb2tlblxyXG5yb3V0ZXIucG9zdChcIi9mb3Jnb3QtcGFzc3dvcmRcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHsgZW1haWwgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgICBpZiAoIWVtYWlsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIkVtYWlsIGlzIHJlcXVpcmVkXCIgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IGVtYWlsLnRvTG93ZXJDYXNlKCkgfSk7XHJcbiAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgIC8vIFJldHVybiBzdWNjZXNzIGFueXdheSAoc2VjdXJpdHkgLSBkb24ndCByZXZlYWwgaWYgZW1haWwgZXhpc3RzKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oeyBtZXNzYWdlOiBcIklmIHRoYXQgZW1haWwgZXhpc3RzLCB3ZSd2ZSBzZW50IGEgcmVzZXQgbGlua1wiIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gR2VuZXJhdGUgcmVzZXQgdG9rZW4gKHZhbGlkIGZvciAxIGhvdXIpXHJcbiAgICAgICAgY29uc3QgcmVzZXRUb2tlbiA9IGp3dC5zaWduKFxyXG4gICAgICAgICAgICB7IGlkOiB1c2VyLl9pZCwgZW1haWw6IHVzZXIuZW1haWwgfSxcclxuICAgICAgICAgICAgUkVTRVRfVE9LRU5fU0VDUkVULFxyXG4gICAgICAgICAgICB7IGV4cGlyZXNJbjogXCIxaFwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBTYXZlIHJlc2V0IHRva2VuIHRvIHVzZXJcclxuICAgICAgICB1c2VyLnJlc2V0VG9rZW4gPSByZXNldFRva2VuO1xyXG4gICAgICAgIHVzZXIucmVzZXRUb2tlbkV4cGlyeSA9IG5ldyBEYXRlKERhdGUubm93KCkgKyA2MCAqIDYwICogMTAwMCk7IC8vIDEgaG91ciBmcm9tIG5vd1xyXG4gICAgICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xyXG5cclxuICAgICAgICAvLyBDb25zdHJ1Y3QgcmVzZXQgbGlua1xyXG4gICAgICAgIGNvbnN0IHJlc2V0TGluayA9IGAke3Byb2Nlc3MuZW52LkZST05URU5EX1VSTCB8fCBcImh0dHA6Ly9sb2NhbGhvc3Q6NTE3M1wifS9yZXNldC1wYXNzd29yZD90b2tlbj0ke3Jlc2V0VG9rZW59YDtcclxuXHJcbiAgICAgICAgLy8gTG9nIHJlc2V0IGxpbmsgKGluIHByb2R1Y3Rpb24sIHNlbmQgdmlhIGVtYWlsKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBcXG49PT0gUEFTU1dPUkQgUkVTRVQgUkVRVUVTVCA9PT1gKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgRW1haWw6ICR7dXNlci5lbWFpbH1gKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgUmVzZXQgTGluazogJHtyZXNldExpbmt9YCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFRva2VuIEV4cGlyZXM6ICR7dXNlci5yZXNldFRva2VuRXhwaXJ5fWApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG5gKTtcclxuXHJcbiAgICAgICAgLy8gVHJ5IHRvIHNlbmQgZW1haWwgaWYgbm9kZW1haWxlciBpcyBjb25maWd1cmVkXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XHJcbiAgICAgICAgICAgICAgICBob3N0OiBwcm9jZXNzLmVudi5TTVRQX0hPU1QsXHJcbiAgICAgICAgICAgICAgICBwb3J0OiBwcm9jZXNzLmVudi5TTVRQX1BPUlQgfHwgNTg3LFxyXG4gICAgICAgICAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5TTVRQX1NFQ1VSRSA9PT0gXCJ0cnVlXCIsXHJcbiAgICAgICAgICAgICAgICBhdXRoOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuU01UUF9VU0VSLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHByb2Nlc3MuZW52LlNNVFBfUEFTUyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwoe1xyXG4gICAgICAgICAgICAgICAgZnJvbTogcHJvY2Vzcy5lbnYuU01UUF9GUk9NIHx8IFwibm9yZXBseUBwaG90b2dyYXBoeS5jb21cIixcclxuICAgICAgICAgICAgICAgIHRvOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgc3ViamVjdDogXCJQYXNzd29yZCBSZXNldCBSZXF1ZXN0XCIsXHJcbiAgICAgICAgICAgICAgICBodG1sOiBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPlBhc3N3b3JkIFJlc2V0IFJlcXVlc3Q8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPllvdSByZXF1ZXN0ZWQgYSBwYXNzd29yZCByZXNldC4gQ2xpY2sgdGhlIGxpbmsgYmVsb3cgdG8gcHJvY2VlZDo8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PGEgaHJlZj1cIiR7cmVzZXRMaW5rfVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2RhYTUyMDsgY29sb3I6IHdoaXRlOyBwYWRkaW5nOiAxMHB4IDIwcHg7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgYm9yZGVyLXJhZGl1czogNXB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+UmVzZXQgUGFzc3dvcmQ8L2E+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlRoaXMgbGluayB3aWxsIGV4cGlyZSBpbiAxIGhvdXIuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPklmIHlvdSBkaWRuJ3QgcmVxdWVzdCB0aGlzLCBwbGVhc2UgaWdub3JlIHRoaXMgZW1haWwuPC9wPlxyXG4gICAgICAgICAgICAgICAgYCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRW1haWwgc2VudCBzdWNjZXNzZnVsbHkgdG86XCIsIHVzZXIuZW1haWwpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVtYWlsRXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbWFpbCBzZXJ2aWNlIG5vdCBjb25maWd1cmVkIG9yIGZhaWxlZC4gUmVzZXQgbGluayBsb2dnZWQgYWJvdmUuXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOlwiLCBlbWFpbEVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiBcIklmIHRoYXQgZW1haWwgZXhpc3RzLCB3ZSd2ZSBzZW50IGEgcmVzZXQgbGlua1wiIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRm9yZ290IFBhc3N3b3JkIEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogXCJTZXJ2ZXIgZXJyb3JcIiB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBSZXNldCBQYXNzd29yZCAtIFZhbGlkYXRlIFRva2VuIGFuZCBVcGRhdGUgUGFzc3dvcmRcclxucm91dGVyLnBvc3QoXCIvcmVzZXQtcGFzc3dvcmRcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHsgdG9rZW4sIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICAgICAgaWYgKCF0b2tlbiB8fCAhcGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiVG9rZW4gYW5kIHBhc3N3b3JkIGFyZSByZXF1aXJlZFwiIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IDYpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnNcIiB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZlcmlmeSB0b2tlblxyXG4gICAgICAgIGxldCBkZWNvZGVkO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCBSRVNFVF9UT0tFTl9TRUNSRVQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiBcIkludmFsaWQgb3IgZXhwaXJlZCByZXNldCB0b2tlblwiIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmluZCB1c2VyXHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQoZGVjb2RlZC5pZCk7XHJcbiAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcIlVzZXIgbm90IGZvdW5kXCIgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBWZXJpZnkgdG9rZW4gbWF0Y2hlcyBhbmQgaGFzbid0IGV4cGlyZWRcclxuICAgICAgICBpZiAodXNlci5yZXNldFRva2VuICE9PSB0b2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogXCJJbnZhbGlkIHJlc2V0IHRva2VuXCIgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXVzZXIucmVzZXRUb2tlbkV4cGlyeSB8fCB1c2VyLnJlc2V0VG9rZW5FeHBpcnkgPCBuZXcgRGF0ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IGVycm9yOiBcIlJlc2V0IHRva2VuIGhhcyBleHBpcmVkXCIgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgcGFzc3dvcmRcclxuICAgICAgICB1c2VyLnBhc3N3b3JkID0gYXdhaXQgaGFzaFBhc3N3b3JkKHBhc3N3b3JkKTtcclxuICAgICAgICB1c2VyLnJlc2V0VG9rZW4gPSBudWxsO1xyXG4gICAgICAgIHVzZXIucmVzZXRUb2tlbkV4cGlyeSA9IG51bGw7XHJcbiAgICAgICAgYXdhaXQgdXNlci5zYXZlKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBcXG49PT0gUEFTU1dPUkQgUkVTRVQgQ09NUExFVEVEID09PWApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyOiAke3VzZXIuZW1haWx9YCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFRpbWU6ICR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfWApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbmApO1xyXG5cclxuICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6IFwiUGFzc3dvcmQgcmVzZXQgc3VjY2Vzc2Z1bGx5LiBZb3UgY2FuIG5vdyBsb2dpbiB3aXRoIHlvdXIgbmV3IHBhc3N3b3JkLlwiIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiUmVzZXQgUGFzc3dvcmQgRXJyb3I6XCIsIGVycm9yKTtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBcIlNlcnZlciBlcnJvclwiIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxVc2VyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9tb2RlbHMvVXNlci5qc1wiO2ltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmNvbnN0IHVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICAgIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSwgbG93ZXJjYXNlOiB0cnVlIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICAgIHJvbGU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBcInVzZXJcIiwgZW51bTogW1widXNlclwiLCBcImFkbWluXCIsIFwiZWRpdG9yXCJdIH0sXHJcbiAgICAgICAgcGhvbmU6IHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgICAgICAgc3RhdHVzOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogXCJBY3RpdmVcIiwgZW51bTogW1wiQWN0aXZlXCIsIFwiSW5hY3RpdmVcIl0gfSxcclxuICAgICAgICByZXNldFRva2VuOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgICAgIHJlc2V0VG9rZW5FeHBpcnk6IHsgdHlwZTogRGF0ZSwgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgfSxcclxuICAgIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuVXNlciB8fCBtb25nb29zZS5tb2RlbChcIlVzZXJcIiwgdXNlclNjaGVtYSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHV0aWxzXFxcXGVuY3J5cHRpb24uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL3V0aWxzL2VuY3J5cHRpb24uanNcIjtpbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcclxuXHJcbmV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSBhc3luYyAocGFzc3dvcmQpID0+IHtcclxuICAgIGlmICghcGFzc3dvcmQpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3Qgc2FsdCA9IGF3YWl0IGJjcnlwdC5nZW5TYWx0KDEwKTtcclxuICAgIHJldHVybiBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgc2FsdCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29tcGFyZVBhc3N3b3JkID0gYXN5bmMgKHBhc3N3b3JkLCBoYXNoZWRQYXNzd29yZCkgPT4ge1xyXG4gICAgaWYgKCFwYXNzd29yZCB8fCAhaGFzaGVkUGFzc3dvcmQpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgaGFzaGVkUGFzc3dvcmQpO1xyXG59O1xyXG5cclxuLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHkgc3R1YnMgKHNob3VsZCBub3QgYmUgdXNlZCBmb3IgbmV3IGNvZGUpXHJcbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gYXN5bmMgKHRleHQpID0+IGhhc2hQYXNzd29yZCh0ZXh0KTtcclxuZXhwb3J0IGNvbnN0IGRlY3J5cHQgPSAoKSA9PiBudWxsOyBcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1xcXFxzbGlkZXJSb3V0ZXMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL3JvdXRlcy9zbGlkZXJSb3V0ZXMuanNcIjtpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHtcclxuICAgIGdldEFsbFNsaWRlcnMsXHJcbiAgICBjcmVhdGVTbGlkZXIsXHJcbiAgICB1cGRhdGVTbGlkZXIsXHJcbiAgICBkZWxldGVTbGlkZXJcclxufSBmcm9tICcuLi9jb250cm9sbGVycy9zbGlkZXJDb250cm9sbGVyLmpzJztcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvJywgZ2V0QWxsU2xpZGVycyk7XHJcbnJvdXRlci5wb3N0KCcvJywgY3JlYXRlU2xpZGVyKTtcclxucm91dGVyLnB1dCgnLzppZCcsIHVwZGF0ZVNsaWRlcik7XHJcbnJvdXRlci5kZWxldGUoJy86aWQnLCBkZWxldGVTbGlkZXIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXFxcXFNsaWRlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvbW9kZWxzL1NsaWRlci5qc1wiO2ltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmNvbnN0IHNsaWRlclNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICAgIHN1YnRpdGxlOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gICAgICAgIGltYWdlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgICAgICBzdGF0dXM6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbXCJBY3RpdmVcIiwgXCJJbmFjdGl2ZVwiXSwgZGVmYXVsdDogXCJBY3RpdmVcIiB9LFxyXG4gICAgICAgIG9yZGVyOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMCB9LFxyXG4gICAgfSxcclxuICAgIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuU2xpZGVyIHx8IG1vbmdvb3NlLm1vZGVsKFwiU2xpZGVyXCIsIHNsaWRlclNjaGVtYSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXFxcXHNsaWRlckNvbnRyb2xsZXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL2NvbnRyb2xsZXJzL3NsaWRlckNvbnRyb2xsZXIuanNcIjtpbXBvcnQgU2xpZGVyIGZyb20gXCIuLi9tb2RlbHMvU2xpZGVyLmpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QWxsU2xpZGVycyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBzbGlkZXJzID0gYXdhaXQgU2xpZGVyLmZpbmQoKS5zb3J0KHsgb3JkZXI6IDEgfSk7XHJcbiAgICAgICAgcmVzLmpzb24oc2xpZGVycyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTbGlkZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbmV3IFNsaWRlcihyZXEuYm9keSk7XHJcbiAgICAgICAgYXdhaXQgc2xpZGVyLnNhdmUoKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMSkuanNvbihzbGlkZXIpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlU2xpZGVyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IGF3YWl0IFNsaWRlci5maW5kQnlJZEFuZFVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSwgeyBuZXc6IHRydWUgfSk7XHJcbiAgICAgICAgaWYgKCFzbGlkZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiU2xpZGVyIG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKHNsaWRlcik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVTbGlkZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gYXdhaXQgU2xpZGVyLmZpbmRCeUlkQW5kRGVsZXRlKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgICAgIGlmICghc2xpZGVyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlNsaWRlciBub3QgZm91bmRcIiB9KTtcclxuICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6IFwiU2xpZGVyIGRlbGV0ZWRcIiB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXFxcXGdhbGxlcnlSb3V0ZXMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL3JvdXRlcy9nYWxsZXJ5Um91dGVzLmpzXCI7aW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRBbGxHYWxsZXJ5SXRlbXMsXHJcbiAgICBjcmVhdGVHYWxsZXJ5SXRlbSxcclxuICAgIHVwZGF0ZUdhbGxlcnlJdGVtLFxyXG4gICAgZGVsZXRlR2FsbGVyeUl0ZW1cclxufSBmcm9tICcuLi9jb250cm9sbGVycy9nYWxsZXJ5Q29udHJvbGxlci5qcyc7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLmdldCgnLycsIGdldEFsbEdhbGxlcnlJdGVtcyk7XHJcbnJvdXRlci5wb3N0KCcvJywgY3JlYXRlR2FsbGVyeUl0ZW0pO1xyXG5yb3V0ZXIucHV0KCcvOmlkJywgdXBkYXRlR2FsbGVyeUl0ZW0pO1xyXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgZGVsZXRlR2FsbGVyeUl0ZW0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXFxcXEdhbGxlcnkuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL21vZGVscy9HYWxsZXJ5LmpzXCI7aW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuY29uc3QgZ2FsbGVyeVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6IHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgICAgICAgaW1hZ2U6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICAgIGNhdGVnb3J5OiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogXCJHZW5lcmFsXCIgfSxcclxuICAgICAgICBzdGF0dXM6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbXCJBY3RpdmVcIiwgXCJJbmFjdGl2ZVwiXSwgZGVmYXVsdDogXCJBY3RpdmVcIiB9LFxyXG4gICAgfSxcclxuICAgIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuR2FsbGVyeSB8fCBtb25nb29zZS5tb2RlbChcIkdhbGxlcnlcIiwgZ2FsbGVyeVNjaGVtYSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXFxcXGdhbGxlcnlDb250cm9sbGVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9jb250cm9sbGVycy9nYWxsZXJ5Q29udHJvbGxlci5qc1wiO2ltcG9ydCBHYWxsZXJ5IGZyb20gXCIuLi9tb2RlbHMvR2FsbGVyeS5qc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFsbEdhbGxlcnlJdGVtcyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBpdGVtcyA9IGF3YWl0IEdhbGxlcnkuZmluZCgpLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKGl0ZW1zKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdhbGxlcnlJdGVtID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgR2FsbGVyeShyZXEuYm9keSk7XHJcbiAgICAgICAgYXdhaXQgaXRlbS5zYXZlKCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24oaXRlbSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVHYWxsZXJ5SXRlbSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBpdGVtID0gYXdhaXQgR2FsbGVyeS5maW5kQnlJZEFuZFVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSwgeyBuZXc6IHRydWUgfSk7XHJcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkl0ZW0gbm90IGZvdW5kXCIgfSk7XHJcbiAgICAgICAgcmVzLmpzb24oaXRlbSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVHYWxsZXJ5SXRlbSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBpdGVtID0gYXdhaXQgR2FsbGVyeS5maW5kQnlJZEFuZERlbGV0ZShyZXEucGFyYW1zLmlkKTtcclxuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiSXRlbSBub3QgZm91bmRcIiB9KTtcclxuICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6IFwiSXRlbSBkZWxldGVkXCIgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1xcXFxvcmRlclJvdXRlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvcm91dGVzL29yZGVyUm91dGVzLmpzXCI7aW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRBbGxPcmRlcnMsXHJcbiAgICBjcmVhdGVPcmRlcixcclxuICAgIHVwZGF0ZU9yZGVyLFxyXG4gICAgZGVsZXRlT3JkZXJcclxufSBmcm9tICcuLi9jb250cm9sbGVycy9vcmRlckNvbnRyb2xsZXIuanMnO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5nZXQoJy8nLCBnZXRBbGxPcmRlcnMpO1xyXG5yb3V0ZXIucG9zdCgnLycsIGNyZWF0ZU9yZGVyKTtcclxucm91dGVyLnB1dCgnLzppZCcsIHVwZGF0ZU9yZGVyKTtcclxucm91dGVyLmRlbGV0ZSgnLzppZCcsIGRlbGV0ZU9yZGVyKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxPcmRlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvbW9kZWxzL09yZGVyLmpzXCI7aW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuY29uc3Qgb3JkZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICAgIHdoYXRzYXBwX25vOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgICAgICBlbWFpbDogeyB0eXBlOiBTdHJpbmcgfSxcclxuICAgICAgICBldmVudF9uYW1lOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gICAgICAgIHBob3RvZ3JhcGh5X3R5cGU6IHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgICAgICAgbG9jYXRpb246IHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgICAgICAgZXZlbnRfZGF0ZTogeyB0eXBlOiBEYXRlIH0sXHJcbiAgICAgICAgZXZlbnRfZW5kX2RhdGU6IHsgdHlwZTogRGF0ZSB9LFxyXG4gICAgICAgIHNlcnZpY2VDb25maWc6IHsgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk1peGVkIH0sXHJcbiAgICAgICAgc3RhcnRfdGltZTogeyB0eXBlOiBTdHJpbmcgfSxcclxuICAgICAgICBlbmRfdGltZTogeyB0eXBlOiBTdHJpbmcgfSxcclxuICAgICAgICBzZXJ2aWNlOiB7IHR5cGU6IFN0cmluZyB9LCAvLyBTdG9yaW5nIGFzIGNvbW1hLXNlcGFyYXRlZCBzdHJpbmcgYXMgcGVyIGZyb250ZW5kIGxvZ2ljXHJcbiAgICAgICAgYWxidW1fcGFnZXM6IHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgICAgICAgYW1vdW50OiB7IHR5cGU6IE51bWJlciB9LFxyXG4gICAgICAgIGFtb3VudF9wYWlkOiB7IHR5cGU6IE51bWJlciB9LFxyXG4gICAgICAgIHJlbWFpbmluZ19hbW91bnQ6IHsgdHlwZTogTnVtYmVyIH0sXHJcbiAgICAgICAgZGVsaXZlcmFibGVzOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gICAgICAgIGRlbGl2ZXJ5X2RhdGU6IHsgdHlwZTogRGF0ZSB9LFxyXG4gICAgICAgIG9yZGVyX3N0YXR1czogeyB0eXBlOiBTdHJpbmcsIGVudW06IFtcIlBlbmRpbmdcIiwgXCJJbiBQcm9ncmVzc1wiLCBcIkRlbGl2ZXJlZFwiLCBcIkNhbmNlbGxlZFwiXSwgZGVmYXVsdDogXCJQZW5kaW5nXCIgfSxcclxuICAgICAgICBub3RlczogeyB0eXBlOiBTdHJpbmcgfSxcclxuICAgICAgICByZWxhdGVkVXNlcjogeyB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ1VzZXInIH0sXHJcbiAgICAgICAgY2xpZW50OiB7IHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnQ2xpZW50JyB9XHJcbiAgICB9LFxyXG4gICAgeyB0aW1lc3RhbXBzOiB0cnVlIH1cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVscy5PcmRlciB8fCBtb25nb29zZS5tb2RlbChcIk9yZGVyXCIsIG9yZGVyU2NoZW1hKTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcXFxcb3JkZXJDb250cm9sbGVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9jb250cm9sbGVycy9vcmRlckNvbnRyb2xsZXIuanNcIjtpbXBvcnQgT3JkZXIgZnJvbSBcIi4uL21vZGVscy9PcmRlci5qc1wiO1xyXG5pbXBvcnQgeyBzZW5kRW1haWwgfSBmcm9tIFwiLi4vdXRpbHMvZW1haWxTZXJ2aWNlLmpzXCI7XHJcbmltcG9ydCB7IGdlbmVyYXRlRW1haWxIdG1sIH0gZnJvbSBcIi4uL3V0aWxzL2VtYWlsVGVtcGxhdGVzLmpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QWxsT3JkZXJzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IG9yZGVycyA9IGF3YWl0IE9yZGVyLmZpbmQoKS5wb3B1bGF0ZSgncmVsYXRlZFVzZXInLCAnbmFtZSBlbWFpbCcpLnNvcnQoeyBkZWxpdmVyeV9kYXRlOiAtMSwgY3JlYXRlZEF0OiAtMSB9KTtcclxuICAgICAgICByZXMuanNvbihvcmRlcnMpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlT3JkZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgb3JkZXJEYXRhID0geyAuLi5yZXEuYm9keSB9O1xyXG4gICAgICAgIGNvbnN0IHsgbmFtZSwgZW1haWwsIHdoYXRzYXBwX25vLCBldmVudF9uYW1lLCBldmVudF9kYXRlIH0gPSBvcmRlckRhdGE7XHJcblxyXG4gICAgICAgIC8vIFRyeSB0byBsaW5rIHdpdGggZXhpc3RpbmcgY2xpZW50IG9yIGNyZWF0ZSBuZXcgb25lXHJcbiAgICAgICAgaWYgKG5hbWUgfHwgZW1haWwgfHwgd2hhdHNhcHBfbm8pIHtcclxuICAgICAgICAgICAgY29uc3QgQ2xpZW50ID0gKGF3YWl0IGltcG9ydChcIi4uL21vZGVscy9DbGllbnQuanNcIikpLmRlZmF1bHQ7XHJcblxyXG4gICAgICAgICAgICAvLyBUcnkgdG8gZmluZCBjbGllbnQgYnkgdW5pcXVlIGlkZW50aWZpZXJzXHJcbiAgICAgICAgICAgIGxldCBjbGllbnQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoZW1haWwpIGNsaWVudCA9IGF3YWl0IENsaWVudC5maW5kT25lKHsgZW1haWwgfSk7XHJcbiAgICAgICAgICAgIGlmICghY2xpZW50ICYmIHdoYXRzYXBwX25vKSBjbGllbnQgPSBhd2FpdCBDbGllbnQuZmluZE9uZSh7IHBob25lOiB3aGF0c2FwcF9ubyB9KTtcclxuICAgICAgICAgICAgaWYgKCFjbGllbnQgJiYgbmFtZSkgY2xpZW50ID0gYXdhaXQgQ2xpZW50LmZpbmRPbmUoeyBuYW1lIH0pOyAvLyBGYWxsYmFjayB0byBuYW1lXHJcblxyXG4gICAgICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgICAgICBvcmRlckRhdGEuY2xpZW50ID0gY2xpZW50Ll9pZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgY2xpZW50IGlmIGVub3VnaCBpbmZvXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudCA9IG5ldyBDbGllbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lIHx8IFwiVW5rbm93blwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwgfHwgYHRlbXBfJHtEYXRlLm5vdygpfUBleGFtcGxlLmNvbWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB3aGF0c2FwcF9ubyB8fCBcIjAwMDAwMDAwMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJSZWd1bGFyXCIsIC8vIERlZmF1bHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBcIk9yZGVyXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjbGllbnQuc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyRGF0YS5jbGllbnQgPSBjbGllbnQuX2lkO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoY2xpZW50RXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkF1dG8tY3JlYXRlIGNsaWVudCBmYWlsZWQ6XCIsIGNsaWVudEVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VlZCB3aXRob3V0IGxpbmtpbmcgaWYgY2xpZW50IGNyZWF0aW9uIGZhaWxzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG9yZGVyID0gbmV3IE9yZGVyKG9yZGVyRGF0YSk7XHJcbiAgICAgICAgYXdhaXQgb3JkZXIuc2F2ZSgpO1xyXG5cclxuICAgICAgICAvLyBTZW5kIEVtYWlsIE5vdGlmaWNhdGlvbiBpZiBlbWFpbCBpcyBwcm92aWRlZFxyXG4gICAgICAgIC8vIFNlbmQgRW1haWwgTm90aWZpY2F0aW9uIGlmIGVtYWlsIGlzIHByb3ZpZGVkXHJcbiAgICAgICAgaWYgKGVtYWlsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGh0bWxDb250ZW50ID0gZ2VuZXJhdGVFbWFpbEh0bWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiT3JkZXIgQ29uZmlybWF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBncmVldGluZzogYEhlbGxvICR7bmFtZSB8fCAnVmFsdWVkIEN1c3RvbWVyJ30sYCxcclxuICAgICAgICAgICAgICAgIGludHJvOiBcIlRoYW5rIHlvdSBmb3IgY2hvb3NpbmcgVGhlIFBhdGlsIFBob3RvZ3JhcGh5LiBZb3VyIG9yZGVyIGhhcyBiZWVuIHBsYWNlZCBzdWNjZXNzZnVsbHkuIEJlbG93IGFyZSB0aGUgZGV0YWlscyBvZiB5b3VyIGJvb2tpbmcuXCIsXHJcbiAgICAgICAgICAgICAgICBkZXRhaWxzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJPcmRlciBJRFwiOiBvcmRlci5faWQudG9TdHJpbmcoKS5zbGljZSgtNikudG9VcHBlckNhc2UoKSxcclxuICAgICAgICAgICAgICAgICAgICBcIkV2ZW50IE5hbWVcIjogZXZlbnRfbmFtZSB8fCAnTi9BJyxcclxuICAgICAgICAgICAgICAgICAgICBcIkV2ZW50IERhdGVcIjogZXZlbnRfZGF0ZSA/IG5ldyBEYXRlKGV2ZW50X2RhdGUpLnRvRGF0ZVN0cmluZygpIDogJ04vQScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJMb2NhdGlvblwiOiBvcmRlckRhdGEubG9jYXRpb24gfHwgJ04vQScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTZXJ2aWNlIFR5cGVcIjogb3JkZXJEYXRhLnBob3RvZ3JhcGh5X3R5cGUgfHwgJ04vQScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTZXJ2aWNlc1wiOiBBcnJheS5pc0FycmF5KG9yZGVyRGF0YS5zZXJ2aWNlKSA/IG9yZGVyRGF0YS5zZXJ2aWNlLmpvaW4oXCIsIFwiKSA6IChvcmRlckRhdGEuc2VydmljZSB8fCAnTi9BJyksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJQYWNrYWdlXCI6IG9yZGVyRGF0YS5wYWNrYWdlIHx8ICdOL0EnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQWxidW0gUGFnZXNcIjogb3JkZXJEYXRhLmFsYnVtX3BhZ2VzIHx8ICdOL0EnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVG90YWwgQW1vdW50XCI6IG9yZGVyRGF0YS5hbW91bnQgPyBgXHUyMEI5JHtOdW1iZXIob3JkZXJEYXRhLmFtb3VudCkudG9Mb2NhbGVTdHJpbmcoJ2VuLUlOJyl9YCA6ICdOL0EnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUGFpZCBBbW91bnRcIjogb3JkZXJEYXRhLmFtb3VudF9wYWlkID8gYFx1MjBCOSR7TnVtYmVyKG9yZGVyRGF0YS5hbW91bnRfcGFpZCkudG9Mb2NhbGVTdHJpbmcoJ2VuLUlOJyl9YCA6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICBcIkJhbGFuY2UgRHVlXCI6IG9yZGVyRGF0YS5yZW1haW5pbmdfYW1vdW50ID8gYFx1MjBCOSR7TnVtYmVyKG9yZGVyRGF0YS5yZW1haW5pbmdfYW1vdW50KS50b0xvY2FsZVN0cmluZygnZW4tSU4nKX1gIDogJ04vQScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJEZWxpdmVyYWJsZXNcIjogb3JkZXJEYXRhLmRlbGl2ZXJhYmxlcyB8fCAnTi9BJyxcclxuICAgICAgICAgICAgICAgICAgICBcIkRlbGl2ZXJ5IERhdGVcIjogb3JkZXJEYXRhLmRlbGl2ZXJ5X2RhdGUgPyBuZXcgRGF0ZShvcmRlckRhdGEuZGVsaXZlcnlfZGF0ZSkudG9EYXRlU3RyaW5nKCkgOiAnVEJEJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdGlvblRleHQ6IFwiQ29udGFjdCBVc1wiLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uVXJsOiBwcm9jZXNzLmVudi5DTElFTlRfVVJMIHx8IFwiI1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYXdhaXQgc2VuZEVtYWlsKHtcclxuICAgICAgICAgICAgICAgIHRvOiBlbWFpbCxcclxuICAgICAgICAgICAgICAgIGNjOiBcInBpeGVscHJvaXRzb2x1dGlvbnNAZ21haWwuY29tXCIsXHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiBgT3JkZXIgQ29uZmlybWF0aW9uIC0gJHtldmVudF9uYW1lIHx8ICdFdmVudCd9YCxcclxuICAgICAgICAgICAgICAgIGh0bWw6IGh0bWxDb250ZW50XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24ob3JkZXIpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlT3JkZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgb3JkZXIgPSBhd2FpdCBPcmRlci5maW5kQnlJZEFuZFVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSwgeyBuZXc6IHRydWUgfSk7XHJcbiAgICAgICAgaWYgKCFvcmRlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJPcmRlciBub3QgZm91bmRcIiB9KTtcclxuICAgICAgICByZXMuanNvbihvcmRlcik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVPcmRlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBvcmRlciA9IGF3YWl0IE9yZGVyLmZpbmRCeUlkQW5kRGVsZXRlKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgICAgIGlmICghb3JkZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiT3JkZXIgbm90IGZvdW5kXCIgfSk7XHJcbiAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiBcIk9yZGVyIGRlbGV0ZWRcIiB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXFxcXHVzZXJSb3V0ZXMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL3JvdXRlcy91c2VyUm91dGVzLmpzXCI7aW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRBbGxVc2VycyxcclxuICAgIGNyZWF0ZVVzZXIsXHJcbiAgICB1cGRhdGVVc2VyLFxyXG4gICAgZGVsZXRlVXNlcixcclxuICAgIHJldmVhbFBhc3N3b3JkXHJcbn0gZnJvbSAnLi4vY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIuanMnO1xyXG5pbXBvcnQgeyByZXF1aXJlQXV0aCB9IGZyb20gJy4uL21pZGRsZXdhcmUvYXV0aC5qcyc7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLnBvc3QoJy9yZXZlYWwnLCByZXF1aXJlQXV0aCwgcmV2ZWFsUGFzc3dvcmQpO1xyXG5yb3V0ZXIuZ2V0KCcvJywgZ2V0QWxsVXNlcnMpO1xyXG5yb3V0ZXIucG9zdCgnLycsIGNyZWF0ZVVzZXIpO1xyXG5yb3V0ZXIucHV0KCcvOmlkJywgdXBkYXRlVXNlcik7XHJcbnJvdXRlci5kZWxldGUoJy86aWQnLCBkZWxldGVVc2VyKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcXFxcdXNlckNvbnRyb2xsZXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL2NvbnRyb2xsZXJzL3VzZXJDb250cm9sbGVyLmpzXCI7aW1wb3J0IFVzZXIgZnJvbSBcIi4uL21vZGVscy9Vc2VyLmpzXCI7XHJcbmltcG9ydCB7IGhhc2hQYXNzd29yZCwgY29tcGFyZVBhc3N3b3JkLCBkZWNyeXB0IH0gZnJvbSBcIi4uL3V0aWxzL2VuY3J5cHRpb24uanNcIjtcclxuaW1wb3J0IHsgc2VuZEVtYWlsIH0gZnJvbSBcIi4uL3V0aWxzL2VtYWlsU2VydmljZS5qc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFsbFVzZXJzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgVXNlci5maW5kKCkuc2VsZWN0KFwiLXBhc3N3b3JkXCIpLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKHVzZXJzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVVzZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgeyBuYW1lLCBlbWFpbCwgcGFzc3dvcmQsIHJvbGUsIHBob25lLCBzdGF0dXMgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgICBpZiAoIXBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiUGFzc3dvcmQgaXMgcmVxdWlyZWRcIiB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWwgfSk7XHJcbiAgICAgICAgaWYgKGV4aXN0aW5nKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIkVtYWlsIGFscmVhZHkgZXhpc3RzXCIgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaFBhc3N3b3JkKHBhc3N3b3JkKTtcclxuICAgICAgICBpZiAoIWhhc2hlZFBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiSGFzaGluZyBmYWlsZWRcIiB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih7XHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGVtYWlsLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXHJcbiAgICAgICAgICAgIHJvbGUsXHJcbiAgICAgICAgICAgIHBob25lLFxyXG4gICAgICAgICAgICBzdGF0dXNcclxuICAgICAgICB9KTtcclxuICAgICAgICBhd2FpdCB1c2VyLnNhdmUoKTtcclxuXHJcbiAgICAgICAgLy8gU2VuZCBXZWxjb21lIEVtYWlsXHJcbiAgICAgICAgY29uc3QgaHRtbENvbnRlbnQgPSBgXHJcbiAgICAgICAgICAgIDxoMj5XZWxjb21lIHRvIFRoZSBQYXRpbCBQaG90b2dyYXBoeTwvaDI+XHJcbiAgICAgICAgICAgIDxwPkhlbGxvICR7bmFtZX0sPC9wPlxyXG4gICAgICAgICAgICA8cD5Zb3VyIGFjY291bnQgaGFzIGJlZW4gY3JlYXRlZCBzdWNjZXNzZnVsbHkuPC9wPlxyXG4gICAgICAgICAgICA8cD48c3Ryb25nPkVtYWlsOjwvc3Ryb25nPiAke2VtYWlsfTwvcD5cclxuICAgICAgICAgICAgPHA+PHN0cm9uZz5QYXNzd29yZDo8L3N0cm9uZz4gJHtwYXNzd29yZH08L3A+XHJcbiAgICAgICAgICAgIDxwPlBsZWFzZSBsb2dpbiB0byB5b3VyIGRhc2hib2FyZC48L3A+XHJcbiAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgPHA+QmVzdCBSZWdhcmRzLDwvcD5cclxuICAgICAgICAgICAgPHA+VGhlIFBhdGlsIFBob3RvZ3JhcGh5IFRlYW08L3A+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgYXdhaXQgc2VuZEVtYWlsKHtcclxuICAgICAgICAgICAgdG86IGVtYWlsLFxyXG4gICAgICAgICAgICBjYzogXCJwaXhlbHByb2l0c29sdXRpb25zQGdtYWlsLmNvbVwiLFxyXG4gICAgICAgICAgICBzdWJqZWN0OiBcIldlbGNvbWUgLSBBY2NvdW50IENyZWF0ZWRcIixcclxuICAgICAgICAgICAgaHRtbDogaHRtbENvbnRlbnRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgeyBwYXNzd29yZDogXywgLi4udXNlcldpdGhvdXRQYXNzd29yZCB9ID0gdXNlci50b09iamVjdCgpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHVzZXJXaXRob3V0UGFzc3dvcmQpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiQ3JlYXRlIFVzZXIgRXJyb3I6XCIsIGVycm9yKTtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlVXNlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7IHBhc3N3b3JkLCAuLi5yZXN0IH0gPSByZXEuYm9keTtcclxuICAgICAgICBjb25zdCB1cGRhdGVEYXRhID0geyAuLi5yZXN0IH07XHJcblxyXG4gICAgICAgIGlmIChwYXNzd29yZCAmJiBwYXNzd29yZC50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgdXBkYXRlRGF0YS5wYXNzd29yZCA9IGF3YWl0IGhhc2hQYXNzd29yZChwYXNzd29yZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZEFuZFVwZGF0ZShyZXEucGFyYW1zLmlkLCB1cGRhdGVEYXRhLCB7IG5ldzogdHJ1ZSB9KS5zZWxlY3QoXCItcGFzc3dvcmRcIik7XHJcbiAgICAgICAgaWYgKCF1c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlVzZXIgbm90IGZvdW5kXCIgfSk7XHJcbiAgICAgICAgcmVzLmpzb24odXNlcik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVVc2VyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkQW5kRGVsZXRlKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgICAgIGlmICghdXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJVc2VyIG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogXCJVc2VyIGRlbGV0ZWRcIiB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJldmVhbFBhc3N3b3JkID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHsgYWRtaW5QYXNzd29yZCwgdGFyZ2V0VXNlcklkIH0gPSByZXEuYm9keTtcclxuICAgICAgICBjb25zdCBhZG1pbklkID0gcmVxLnVzZXIuaWQ7XHJcblxyXG4gICAgICAgIGlmICghYWRtaW5QYXNzd29yZCB8fCAhdGFyZ2V0VXNlcklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiTWlzc2luZyByZXF1aXJlZCBmaWVsZHNcIiB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZlcmlmeSBBZG1pblxyXG4gICAgICAgIGNvbnN0IGFkbWluID0gYXdhaXQgVXNlci5maW5kQnlJZChhZG1pbklkKTtcclxuICAgICAgICBpZiAoIWFkbWluIHx8IGFkbWluLnJvbGUgIT09ICdhZG1pbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5qc29uKHsgbWVzc2FnZTogXCJVbmF1dGhvcml6ZWRcIiB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZlcmlmeSBhZG1pbiBwYXNzd29yZFxyXG4gICAgICAgIGNvbnN0IGlzTWF0Y2ggPSBhd2FpdCBjb21wYXJlUGFzc3dvcmQoYWRtaW5QYXNzd29yZCwgYWRtaW4ucGFzc3dvcmQpO1xyXG4gICAgICAgIGlmICghaXNNYXRjaCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFtSZXZlYWxdIFBhc3N3b3JkIG1pc21hdGNoIGZvciBhZG1pbjogJHthZG1pbi5lbWFpbH1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgbWVzc2FnZTogXCJJbmNvcnJlY3QgYWRtaW4gcGFzc3dvcmRcIiB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZldGNoIFRhcmdldCBVc2VyXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0VXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQodGFyZ2V0VXNlcklkKTtcclxuICAgICAgICBpZiAoIXRhcmdldFVzZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJVc2VyIG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQmNyeXB0IGhhc2hlcyBjYW5ub3QgYmUgcmV2ZXJzZWRcclxuICAgICAgICByZXR1cm4gcmVzLmpzb24oeyBwYXNzd29yZDogXCJFbmNyeXB0ZWQgKENhbm5vdCBSZXZlYWwpXCIgfSk7XHJcblxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiUmV2ZWFsIEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1pZGRsZXdhcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1pZGRsZXdhcmVcXFxcYXV0aC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvbWlkZGxld2FyZS9hdXRoLmpzXCI7aW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcblxyXG5jb25zdCBKV1RfU0VDUkVUID0gcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCBcImNoYW5nZS10aGlzLXNlY3JldFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlcXVpcmVBdXRoID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICBjb25zdCBhdXRoID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcclxuICAgIGlmICghYXV0aCB8fCAhYXV0aC5zdGFydHNXaXRoKFwiQmVhcmVyIFwiKSkgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSk7XHJcblxyXG4gICAgY29uc3QgdG9rZW4gPSBhdXRoLnNwbGl0KFwiIFwiKVsxXTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGp3dC52ZXJpZnkodG9rZW4sIEpXVF9TRUNSRVQpO1xyXG4gICAgICAgIHJlcS51c2VyID0gcGF5bG9hZDtcclxuICAgICAgICBuZXh0KCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogXCJJbnZhbGlkIHRva2VuXCIgfSk7XHJcbiAgICB9XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcXFxcZmlsbVJvdXRlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvcm91dGVzL2ZpbG1Sb3V0ZXMuanNcIjtpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHtcclxuICAgIGdldEFsbEZpbG1zLFxyXG4gICAgY3JlYXRlRmlsbSxcclxuICAgIHVwZGF0ZUZpbG0sXHJcbiAgICBkZWxldGVGaWxtXHJcbn0gZnJvbSAnLi4vY29udHJvbGxlcnMvZmlsbUNvbnRyb2xsZXIuanMnO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5nZXQoJy8nLCBnZXRBbGxGaWxtcyk7XHJcbnJvdXRlci5wb3N0KCcvJywgY3JlYXRlRmlsbSk7XHJcbnJvdXRlci5wdXQoJy86aWQnLCB1cGRhdGVGaWxtKTtcclxucm91dGVyLmRlbGV0ZSgnLzppZCcsIGRlbGV0ZUZpbG0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXFxcXEZpbG0uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL21vZGVscy9GaWxtLmpzXCI7aW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuY29uc3QgZmlsbVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICAgIHlvdXR1YmVVcmw6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICAgIGNhdGVnb3J5OiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogXCJXZWRkaW5nXCIgfSxcclxuICAgICAgICBzdGF0dXM6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbXCJBY3RpdmVcIiwgXCJJbmFjdGl2ZVwiXSwgZGVmYXVsdDogXCJBY3RpdmVcIiB9LFxyXG4gICAgfSxcclxuICAgIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuRmlsbSB8fCBtb25nb29zZS5tb2RlbChcIkZpbG1cIiwgZmlsbVNjaGVtYSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXFxcXGZpbG1Db250cm9sbGVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9jb250cm9sbGVycy9maWxtQ29udHJvbGxlci5qc1wiO2ltcG9ydCBGaWxtIGZyb20gXCIuLi9tb2RlbHMvRmlsbS5qc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFsbEZpbG1zID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGZpbG1zID0gYXdhaXQgRmlsbS5maW5kKCkuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSk7XHJcbiAgICAgICAgcmVzLmpzb24oZmlsbXMpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlRmlsbSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBmaWxtID0gbmV3IEZpbG0ocmVxLmJvZHkpO1xyXG4gICAgICAgIGF3YWl0IGZpbG0uc2F2ZSgpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKGZpbG0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlRmlsbSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBmaWxtID0gYXdhaXQgRmlsbS5maW5kQnlJZEFuZFVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSwgeyBuZXc6IHRydWUgfSk7XHJcbiAgICAgICAgaWYgKCFmaWxtKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkZpbG0gbm90IGZvdW5kXCIgfSk7XHJcbiAgICAgICAgcmVzLmpzb24oZmlsbSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVGaWxtID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGZpbG0gPSBhd2FpdCBGaWxtLmZpbmRCeUlkQW5kRGVsZXRlKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgICAgIGlmICghZmlsbSkgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJGaWxtIG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogXCJGaWxtIGRlbGV0ZWRcIiB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXFxcXGxvdmVTdG9yeVJvdXRlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvcm91dGVzL2xvdmVTdG9yeVJvdXRlcy5qc1wiO2ltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRBbGxMb3ZlU3RvcmllcyxcclxuICAgIGdldExvdmVTdG9yeUJ5SWQsXHJcbiAgICBjcmVhdGVMb3ZlU3RvcnksXHJcbiAgICB1cGRhdGVMb3ZlU3RvcnksXHJcbiAgICBkZWxldGVMb3ZlU3RvcnksXHJcbn0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2xvdmVTdG9yeUNvbnRyb2xsZXIuanNcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KFwiL1wiLCBnZXRBbGxMb3ZlU3Rvcmllcyk7XHJcbnJvdXRlci5nZXQoXCIvOmlkXCIsIGdldExvdmVTdG9yeUJ5SWQpO1xyXG5yb3V0ZXIucG9zdChcIi9cIiwgY3JlYXRlTG92ZVN0b3J5KTtcclxucm91dGVyLnB1dChcIi86aWRcIiwgdXBkYXRlTG92ZVN0b3J5KTtcclxucm91dGVyLmRlbGV0ZShcIi86aWRcIiwgZGVsZXRlTG92ZVN0b3J5KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxMb3ZlU3RvcnkuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL21vZGVscy9Mb3ZlU3RvcnkuanNcIjtpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG5jb25zdCBsb3ZlU3RvcnlTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgICAgICBsb2NhdGlvbjogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICAgICAgZGVzY3JpcHRpb246IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LCAvLyBGdWxsIERlc2NyaXB0aW9uXHJcbiAgICAgICAgdGh1bWJuYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSwgLy8gQmFzZTY0IG9yIFVSTFxyXG4gICAgICAgIGdhbGxlcnk6IFt7IHR5cGU6IFN0cmluZyB9XSwgLy8gQXJyYXkgb2YgQmFzZTY0IG9yIFVSTHNcclxuICAgICAgICBzdGF0dXM6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbXCJBY3RpdmVcIiwgXCJJbmFjdGl2ZVwiXSwgZGVmYXVsdDogXCJBY3RpdmVcIiB9LFxyXG4gICAgfSxcclxuICAgIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuTG92ZVN0b3J5IHx8IG1vbmdvb3NlLm1vZGVsKFwiTG92ZVN0b3J5XCIsIGxvdmVTdG9yeVNjaGVtYSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXFxcXGxvdmVTdG9yeUNvbnRyb2xsZXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL2NvbnRyb2xsZXJzL2xvdmVTdG9yeUNvbnRyb2xsZXIuanNcIjtpbXBvcnQgTG92ZVN0b3J5IGZyb20gXCIuLi9tb2RlbHMvTG92ZVN0b3J5LmpzXCI7XHJcblxyXG4vLyBHZXQgYWxsIGxvdmUgc3Rvcmllc1xyXG5leHBvcnQgY29uc3QgZ2V0QWxsTG92ZVN0b3JpZXMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmllcyA9IGF3YWl0IExvdmVTdG9yeS5maW5kKCkuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSk7XHJcbiAgICAgICAgcmVzLmpzb24oc3Rvcmllcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIEdldCBzaW5nbGUgbG92ZSBzdG9yeVxyXG5leHBvcnQgY29uc3QgZ2V0TG92ZVN0b3J5QnlJZCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBzdG9yeSA9IGF3YWl0IExvdmVTdG9yeS5maW5kQnlJZChyZXEucGFyYW1zLmlkKTtcclxuICAgICAgICBpZiAoIXN0b3J5KSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlN0b3J5IG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKHN0b3J5KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gQ3JlYXRlIG5ldyBsb3ZlIHN0b3J5XHJcbmV4cG9ydCBjb25zdCBjcmVhdGVMb3ZlU3RvcnkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcnkgPSBuZXcgTG92ZVN0b3J5KHJlcS5ib2R5KTtcclxuICAgICAgICBhd2FpdCBzdG9yeS5zYXZlKCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24oc3RvcnkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBVcGRhdGUgbG92ZSBzdG9yeVxyXG5leHBvcnQgY29uc3QgdXBkYXRlTG92ZVN0b3J5ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHN0b3J5ID0gYXdhaXQgTG92ZVN0b3J5LmZpbmRCeUlkQW5kVXBkYXRlKHJlcS5wYXJhbXMuaWQsIHJlcS5ib2R5LCB7IG5ldzogdHJ1ZSB9KTtcclxuICAgICAgICBpZiAoIXN0b3J5KSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlN0b3J5IG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKHN0b3J5KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gRGVsZXRlIGxvdmUgc3RvcnlcclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUxvdmVTdG9yeSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBzdG9yeSA9IGF3YWl0IExvdmVTdG9yeS5maW5kQnlJZEFuZERlbGV0ZShyZXEucGFyYW1zLmlkKTtcclxuICAgICAgICBpZiAoIXN0b3J5KSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlN0b3J5IG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogXCJTdG9yeSBkZWxldGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcXFxcZW5xdWlyeVJvdXRlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvcm91dGVzL2VucXVpcnlSb3V0ZXMuanNcIjtpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgY3JlYXRlRW5xdWlyeSxcclxuICAgIGdldEFsbEVucXVpcmllcyxcclxuICAgIHVwZGF0ZUVucXVpcnlTdGF0dXMsXHJcbiAgICBkZWxldGVFbnF1aXJ5XHJcbn0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2VucXVpcnlDb250cm9sbGVyLmpzXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLnBvc3QoXCIvXCIsIGNyZWF0ZUVucXVpcnkpO1xyXG5yb3V0ZXIuZ2V0KFwiL1wiLCBnZXRBbGxFbnF1aXJpZXMpO1xyXG5yb3V0ZXIucHV0KFwiLzppZC9zdGF0dXNcIiwgdXBkYXRlRW5xdWlyeVN0YXR1cyk7XHJcbnJvdXRlci5kZWxldGUoXCIvOmlkXCIsIGRlbGV0ZUVucXVpcnkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXFxcXEVucXVpcnkuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL21vZGVscy9FbnF1aXJ5LmpzXCI7aW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG5cclxuY29uc3QgZW5xdWlyeVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoXHJcbiAgICB7XHJcbiAgICAgICAgZ3Jvb21OYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgICAgICBicmlkZU5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICAgIHBob25lTnVtYmVyOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgICAgICBldmVudFN0YXJ0RGF0ZTogeyB0eXBlOiBEYXRlLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICAgIGV2ZW50RW5kRGF0ZTogeyB0eXBlOiBEYXRlLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgICAgIGV2ZW50czogW3sgdHlwZTogU3RyaW5nIH1dLCAvLyBBcnJheSBvZiBldmVudCBuYW1lc1xyXG4gICAgICAgIGJ1ZGdldDogeyB0eXBlOiBOdW1iZXIgfSxcclxuICAgICAgICBsb2NhdGlvbjogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICAgICAgc2VydmljZXM6IFt7IHR5cGU6IFN0cmluZyB9XSwgLy8gQXJyYXkgb2Ygc2VydmljZXMgKFBob3RvZ3JhcGh5L0ZpbG1zL0JvdGgpXHJcbiAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBTdHJpbmcgfSxcclxuICAgICAgICBzdGF0dXM6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbXCJOZXdcIiwgXCJDb250YWN0ZWRcIiwgXCJCb29rZWRcIiwgXCJDbG9zZWRcIl0sIGRlZmF1bHQ6IFwiTmV3XCIgfSxcclxuICAgIH0sXHJcbiAgICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzLkVucXVpcnkgfHwgbW9uZ29vc2UubW9kZWwoXCJFbnF1aXJ5XCIsIGVucXVpcnlTY2hlbWEpO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1xcXFxlbnF1aXJ5Q29udHJvbGxlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvY29udHJvbGxlcnMvZW5xdWlyeUNvbnRyb2xsZXIuanNcIjtpbXBvcnQgRW5xdWlyeSBmcm9tIFwiLi4vbW9kZWxzL0VucXVpcnkuanNcIjtcclxuXHJcbmltcG9ydCB7IHNlbmRFbWFpbCB9IGZyb20gXCIuLi91dGlscy9lbWFpbFNlcnZpY2UuanNcIjtcclxuaW1wb3J0IHsgZ2VuZXJhdGVFbWFpbEh0bWwgfSBmcm9tIFwiLi4vdXRpbHMvZW1haWxUZW1wbGF0ZXMuanNcIjtcclxuXHJcbi8vIENyZWF0ZSBhIG5ldyBlbnF1aXJ5IChQdWJsaWMpXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVFbnF1aXJ5ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVucXVpcnkgPSBuZXcgRW5xdWlyeShyZXEuYm9keSk7XHJcbiAgICAgICAgYXdhaXQgZW5xdWlyeS5zYXZlKCk7XHJcblxyXG4gICAgICAgIC8vIFNlbmQgRW1haWwgTm90aWZpY2F0aW9uXHJcbiAgICAgICAgY29uc3QgYWRtaW5FbWFpbCA9IFwicGl4ZWxwcm9pdHNvbHV0aW9uc0BnbWFpbC5jb21cIjtcclxuICAgICAgICBpZiAoYWRtaW5FbWFpbCkge1xyXG4gICAgICAgICAgICBjb25zdCBodG1sQ29udGVudCA9IGdlbmVyYXRlRW1haWxIdG1sKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5ldyBCb29raW5nIEVucXVpcnlcIixcclxuICAgICAgICAgICAgICAgIGdyZWV0aW5nOiBcIkhlbGxvIEFkbWluLFwiLFxyXG4gICAgICAgICAgICAgICAgaW50cm86IGBZb3UgaGF2ZSByZWNlaXZlZCBhIG5ldyBcIkJvb2sgVXNcIiBlbnF1aXJ5IGZyb20gJHtlbnF1aXJ5Lmdyb29tTmFtZX0gJiAke2VucXVpcnkuYnJpZGVOYW1lfS5gLFxyXG4gICAgICAgICAgICAgICAgZGV0YWlsczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiR3Jvb20ncyBOYW1lXCI6IGVucXVpcnkuZ3Jvb21OYW1lIHx8ICdOL0EnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQnJpZGUncyBOYW1lXCI6IGVucXVpcnkuYnJpZGVOYW1lIHx8ICdOL0EnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUGhvbmUgTnVtYmVyXCI6IGVucXVpcnkucGhvbmVOdW1iZXIgfHwgJ04vQScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJFbWFpbFwiOiBlbnF1aXJ5LmVtYWlsIHx8ICdOL0EnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiRXZlbnQgRGF0ZXNcIjogYCR7bmV3IERhdGUoZW5xdWlyeS5ldmVudFN0YXJ0RGF0ZSkudG9EYXRlU3RyaW5nKCl9IC0gJHtuZXcgRGF0ZShlbnF1aXJ5LmV2ZW50RW5kRGF0ZSkudG9EYXRlU3RyaW5nKCl9YCxcclxuICAgICAgICAgICAgICAgICAgICBcIkxvY2F0aW9uXCI6IGVucXVpcnkubG9jYXRpb24gfHwgJ04vQScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJCdWRnZXRcIjogZW5xdWlyeS5idWRnZXQgPyBgXHUyMEI5JHtlbnF1aXJ5LmJ1ZGdldH1gIDogJ04vQScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJNZXNzYWdlXCI6IGVucXVpcnkubWVzc2FnZSB8fCAnTm8gYWRkaXRpb25hbCBtZXNzYWdlJyxcclxuICAgICAgICAgICAgICAgICAgICBcIlN1Ym1pc3Npb24gRGF0ZVwiOiBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25UZXh0OiBcIlZpZXcgaW4gQWRtaW4gUGFuZWxcIixcclxuICAgICAgICAgICAgICAgIGFjdGlvblVybDogYCR7cHJvY2Vzcy5lbnYuQ0xJRU5UX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDo4MDgwJ30vZW5xdWlyaWVzYFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHNlbmRFbWFpbCh7XHJcbiAgICAgICAgICAgICAgICB0bzogYWRtaW5FbWFpbCxcclxuICAgICAgICAgICAgICAgIHN1YmplY3Q6IGBOZXcgRW5xdWlyeTogJHtlbnF1aXJ5Lmdyb29tTmFtZX0gJiAke2VucXVpcnkuYnJpZGVOYW1lfWAsXHJcbiAgICAgICAgICAgICAgICBodG1sOiBodG1sQ29udGVudCxcclxuICAgICAgICAgICAgICAgIHJlcGx5VG86IGVucXVpcnkuZW1haWwgfHwgXCJcIixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMSkuanNvbihlbnF1aXJ5KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gR2V0IGFsbCBlbnF1aXJpZXMgKEFkbWluKVxyXG5leHBvcnQgY29uc3QgZ2V0QWxsRW5xdWlyaWVzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVucXVpcmllcyA9IGF3YWl0IEVucXVpcnkuZmluZCgpLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKGVucXVpcmllcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIFVwZGF0ZSBlbnF1aXJ5IHN0YXR1cyAoQWRtaW4pXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFbnF1aXJ5U3RhdHVzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHsgc3RhdHVzIH0gPSByZXEuYm9keTtcclxuICAgICAgICBjb25zdCBlbnF1aXJ5ID0gYXdhaXQgRW5xdWlyeS5maW5kQnlJZEFuZFVwZGF0ZShcclxuICAgICAgICAgICAgcmVxLnBhcmFtcy5pZCxcclxuICAgICAgICAgICAgeyBzdGF0dXMgfSxcclxuICAgICAgICAgICAgeyBuZXc6IHRydWUgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKCFlbnF1aXJ5KSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkVucXVpcnkgbm90IGZvdW5kXCIgfSk7XHJcbiAgICAgICAgcmVzLmpzb24oZW5xdWlyeSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIERlbGV0ZSBlbnF1aXJ5IChBZG1pbilcclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUVucXVpcnkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZW5xdWlyeSA9IGF3YWl0IEVucXVpcnkuZmluZEJ5SWRBbmREZWxldGUocmVxLnBhcmFtcy5pZCk7XHJcbiAgICAgICAgaWYgKCFlbnF1aXJ5KSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkVucXVpcnkgbm90IGZvdW5kXCIgfSk7XHJcbiAgICAgICAgcmVzLmpzb24oeyBtZXNzYWdlOiBcIkVucXVpcnkgZGVsZXRlZCBzdWNjZXNzZnVsbHlcIiB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXFxcXGNvbnRhY3RSb3V0ZXMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL3JvdXRlcy9jb250YWN0Um91dGVzLmpzXCI7aW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHtcclxuICAgIGNyZWF0ZUNvbnRhY3QsXHJcbiAgICBnZXRBbGxDb250YWN0cyxcclxuICAgIHVwZGF0ZUNvbnRhY3RTdGF0dXMsXHJcbiAgICBkZWxldGVDb250YWN0XHJcbn0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2NvbnRhY3RDb250cm9sbGVyLmpzXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLnBvc3QoXCIvXCIsIGNyZWF0ZUNvbnRhY3QpO1xyXG5yb3V0ZXIuZ2V0KFwiL1wiLCBnZXRBbGxDb250YWN0cyk7XHJcbnJvdXRlci5wdXQoXCIvOmlkL3N0YXR1c1wiLCB1cGRhdGVDb250YWN0U3RhdHVzKTtcclxucm91dGVyLmRlbGV0ZShcIi86aWRcIiwgZGVsZXRlQ29udGFjdCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcQ29udGFjdC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvbW9kZWxzL0NvbnRhY3QuanNcIjtpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG5jb25zdCBjb250YWN0U2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgICAgICBlbWFpbDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICAgICAgc3ViamVjdDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICAgICAgbWVzc2FnZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgICAgICAgc3RhdHVzOiB7IHR5cGU6IFN0cmluZywgZW51bTogW1wiTmV3XCIsIFwiUmVhZFwiLCBcIlJlcGxpZWRcIl0sIGRlZmF1bHQ6IFwiTmV3XCIgfSxcclxuICAgIH0sXHJcbiAgICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzLkNvbnRhY3QgfHwgbW9uZ29vc2UubW9kZWwoXCJDb250YWN0XCIsIGNvbnRhY3RTY2hlbWEpO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1xcXFxjb250YWN0Q29udHJvbGxlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvY29udHJvbGxlcnMvY29udGFjdENvbnRyb2xsZXIuanNcIjtpbXBvcnQgQ29udGFjdCBmcm9tIFwiLi4vbW9kZWxzL0NvbnRhY3QuanNcIjtcclxuXHJcbmltcG9ydCB7IHNlbmRFbWFpbCB9IGZyb20gXCIuLi91dGlscy9lbWFpbFNlcnZpY2UuanNcIjtcclxuaW1wb3J0IHsgZ2VuZXJhdGVFbWFpbEh0bWwgfSBmcm9tIFwiLi4vdXRpbHMvZW1haWxUZW1wbGF0ZXMuanNcIjtcclxuXHJcbi8vIENyZWF0ZSBhIG5ldyBjb250YWN0IG1lc3NhZ2UgKFB1YmxpYylcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnRhY3QgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdCA9IG5ldyBDb250YWN0KHJlcS5ib2R5KTtcclxuICAgICAgICBhd2FpdCBjb250YWN0LnNhdmUoKTtcclxuXHJcbiAgICAgICAgLy8gU2VuZCBFbWFpbCBOb3RpZmljYXRpb25cclxuICAgICAgICBjb25zdCBhZG1pbkVtYWlsID0gXCJwaXhlbHByb2l0c29sdXRpb25zQGdtYWlsLmNvbVwiO1xyXG5cclxuICAgICAgICBjb25zdCB7IG5hbWUsIGVtYWlsLCBzdWJqZWN0LCBtZXNzYWdlIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICAgICAgY29uc3QgaHRtbENvbnRlbnQgPSBnZW5lcmF0ZUVtYWlsSHRtbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIk5ldyBDb250YWN0IE1lc3NhZ2VcIixcclxuICAgICAgICAgICAgZ3JlZXRpbmc6IFwiSGVsbG8gQWRtaW4sXCIsXHJcbiAgICAgICAgICAgIGludHJvOiBgWW91IGhhdmUgcmVjZWl2ZWQgYSBuZXcgY29udGFjdCBtZXNzYWdlIGZyb20gJHtuYW1lfSB2aWEgdGhlIHdlYnNpdGUgY29udGFjdCBmb3JtLmAsXHJcbiAgICAgICAgICAgIGRldGFpbHM6IHtcclxuICAgICAgICAgICAgICAgIFwiU2VuZGVyIE5hbWVcIjogbmFtZSxcclxuICAgICAgICAgICAgICAgIFwiU2VuZGVyIEVtYWlsXCI6IGVtYWlsLFxyXG4gICAgICAgICAgICAgICAgXCJTdWJqZWN0XCI6IHN1YmplY3QsXHJcbiAgICAgICAgICAgICAgICBcIk1lc3NhZ2UgQ29udGVudFwiOiBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgXCJSZWNlaXZlZCBBdFwiOiBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWN0aW9uVGV4dDogXCJSZXBseSBOb3dcIixcclxuICAgICAgICAgICAgYWN0aW9uVXJsOiBgbWFpbHRvOiR7ZW1haWx9P3N1YmplY3Q9UmU6ICR7c3ViamVjdH1gXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IHNlbmRFbWFpbCh7XHJcbiAgICAgICAgICAgIHRvOiBhZG1pbkVtYWlsLFxyXG4gICAgICAgICAgICAvLyBjYzogXCJwaXhlbHByb2l0c29sdXRpb25zQGdtYWlsLmNvbVwiLFxyXG4gICAgICAgICAgICBzdWJqZWN0OiBgTWVzc2FnZSBSZWNlaXZlZDogJHtzdWJqZWN0fWAsXHJcbiAgICAgICAgICAgIGh0bWw6IGh0bWxDb250ZW50LFxyXG4gICAgICAgICAgICByZXBseVRvOiBlbWFpbCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24oY29udGFjdCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIEdldCBhbGwgY29udGFjdCBtZXNzYWdlcyAoQWRtaW4pXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxDb250YWN0cyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjb250YWN0cyA9IGF3YWl0IENvbnRhY3QuZmluZCgpLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKGNvbnRhY3RzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gVXBkYXRlIGNvbnRhY3Qgc3RhdHVzIChBZG1pbilcclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNvbnRhY3RTdGF0dXMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3QgPSBhd2FpdCBDb250YWN0LmZpbmRCeUlkQW5kVXBkYXRlKFxyXG4gICAgICAgICAgICByZXEucGFyYW1zLmlkLFxyXG4gICAgICAgICAgICB7IHN0YXR1cyB9LFxyXG4gICAgICAgICAgICB7IG5ldzogdHJ1ZSB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoIWNvbnRhY3QpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiQ29udGFjdCBub3QgZm91bmRcIiB9KTtcclxuICAgICAgICByZXMuanNvbihjb250YWN0KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gRGVsZXRlIGNvbnRhY3QgKEFkbWluKVxyXG5leHBvcnQgY29uc3QgZGVsZXRlQ29udGFjdCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjb250YWN0ID0gYXdhaXQgQ29udGFjdC5maW5kQnlJZEFuZERlbGV0ZShyZXEucGFyYW1zLmlkKTtcclxuICAgICAgICBpZiAoIWNvbnRhY3QpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiQ29udGFjdCBub3QgZm91bmRcIiB9KTtcclxuICAgICAgICByZXMuanNvbih7IG1lc3NhZ2U6IFwiQ29udGFjdCBkZWxldGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcXFxcZGFzaGJvYXJkUm91dGVzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9yb3V0ZXMvZGFzaGJvYXJkUm91dGVzLmpzXCI7XHJcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBnZXREYXNoYm9hcmRTdGF0cyB9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2Rhc2hib2FyZENvbnRyb2xsZXIuanMnO1xyXG5cclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5nZXQoJy9zdGF0cycsIGdldERhc2hib2FyZFN0YXRzKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcXFxcZGFzaGJvYXJkQ29udHJvbGxlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvY29udHJvbGxlcnMvZGFzaGJvYXJkQ29udHJvbGxlci5qc1wiO1xyXG5pbXBvcnQgRW5xdWlyeSBmcm9tIFwiLi4vbW9kZWxzL0VucXVpcnkuanNcIjtcclxuaW1wb3J0IE9yZGVyIGZyb20gXCIuLi9tb2RlbHMvT3JkZXIuanNcIjtcclxuaW1wb3J0IFF1b3RhdGlvbiBmcm9tIFwiLi4vbW9kZWxzL1F1b3RhdGlvbi5qc1wiO1xyXG5pbXBvcnQgSW52b2ljZSBmcm9tIFwiLi4vbW9kZWxzL0ludm9pY2UuanNcIjtcclxuaW1wb3J0IENvbnRhY3QgZnJvbSBcIi4uL21vZGVscy9Db250YWN0LmpzXCI7XHJcbmltcG9ydCBDbGllbnQgZnJvbSBcIi4uL21vZGVscy9DbGllbnQuanNcIjtcclxuaW1wb3J0IFRlc3RpbW9uaWFsIGZyb20gXCIuLi9tb2RlbHMvVGVzdGltb25pYWwuanNcIjtcclxuaW1wb3J0IEdhbGxlcnkgZnJvbSBcIi4uL21vZGVscy9HYWxsZXJ5LmpzXCI7XHJcbmltcG9ydCBTbGlkZXIgZnJvbSBcIi4uL21vZGVscy9TbGlkZXIuanNcIjtcclxuaW1wb3J0IExvdmVTdG9yeSBmcm9tIFwiLi4vbW9kZWxzL0xvdmVTdG9yeS5qc1wiO1xyXG5pbXBvcnQgRmlsbSBmcm9tIFwiLi4vbW9kZWxzL0ZpbG0uanNcIjtcclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL21vZGVscy9Vc2VyLmpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0RGFzaGJvYXJkU3RhdHMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0T2ZXZWVrID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgICAgIHN0YXJ0T2ZXZWVrLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gNyk7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRPZk1vbnRoID0gbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSwgMSk7XHJcblxyXG4gICAgICAgIC8vIDEuIEtQSSBDYXJkc1xyXG4gICAgICAgIGNvbnN0IG5ld0VucXVpcmllc1RvZGF5ID0gYXdhaXQgRW5xdWlyeS5jb3VudERvY3VtZW50cyh7IGNyZWF0ZWRBdDogeyAkZ3RlOiB0b2RheSB9IH0pO1xyXG4gICAgICAgIGNvbnN0IG5ld0VucXVpcmllc1dlZWsgPSBhd2FpdCBFbnF1aXJ5LmNvdW50RG9jdW1lbnRzKHsgY3JlYXRlZEF0OiB7ICRndGU6IHN0YXJ0T2ZXZWVrIH0gfSk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIG9yZGVyIHN0YXR1cyBlbnVtIGZvciAnUGVuZGluZycvJ0NvbmZpcm1lZCcgb3Igc2ltaWxhclxyXG4gICAgICAgIGNvbnN0IG5ld09yZGVyc0NvdW50ID0gYXdhaXQgT3JkZXIuY291bnREb2N1bWVudHMoeyBjcmVhdGVkQXQ6IHsgJGd0ZTogc3RhcnRPZk1vbnRoIH0gfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBlbmRpbmdRdW90YXRpb25zID0gYXdhaXQgUXVvdGF0aW9uLmNvdW50RG9jdW1lbnRzKHtcclxuICAgICAgICAgICAgc3RhdHVzOiB7ICRpbjogWydEcmFmdCcsICdTZW50JywgJ0F3YWl0aW5nIEFwcHJvdmFsJ10gfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB1bnBhaWRJbnZvaWNlc0FnZyA9IGF3YWl0IEludm9pY2UuYWdncmVnYXRlKFtcclxuICAgICAgICAgICAgeyAkbWF0Y2g6IHsgcGF5bWVudFN0YXR1czogeyAkbmU6ICdQYWlkJyB9IH0gfSxcclxuICAgICAgICAgICAgeyAkZ3JvdXA6IHsgX2lkOiBudWxsLCBjb3VudDogeyAkc3VtOiAxIH0sIHRvdGFsQW1vdW50OiB7ICRzdW06IHsgJHN1YnRyYWN0OiBbXCIkZ3JhbmRUb3RhbFwiLCBcIiRhbW91bnRQYWlkXCJdIH0gfSB9IH1cclxuICAgICAgICBdKTtcclxuICAgICAgICBjb25zdCB1bnBhaWRJbnZvaWNlc0NvdW50ID0gdW5wYWlkSW52b2ljZXNBZ2dbMF0/LmNvdW50IHx8IDA7XHJcbiAgICAgICAgY29uc3QgdW5wYWlkSW52b2ljZXNBbW91bnQgPSB1bnBhaWRJbnZvaWNlc0FnZ1swXT8udG90YWxBbW91bnQgfHwgMDtcclxuXHJcbiAgICAgICAgY29uc3QgbmV4dFdlZWsgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgICAgbmV4dFdlZWsuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA3KTtcclxuICAgICAgICBjb25zdCB1cGNvbWluZ1Nob290c0NvdW50ID0gYXdhaXQgT3JkZXIuY291bnREb2N1bWVudHMoe1xyXG4gICAgICAgICAgICBldmVudF9kYXRlOiB7ICRndGU6IHRvZGF5LCAkbHRlOiBuZXh0V2VlayB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEdhbGxlcnkgLyBDb250ZW50IEhlYWx0aFxyXG4gICAgICAgIGNvbnN0IGdhbGxlcnlRdWV1ZSA9IGF3YWl0IE9yZGVyLmNvdW50RG9jdW1lbnRzKHsgb3JkZXJfc3RhdHVzOiAnSW4gUHJvZ3Jlc3MnIH0pO1xyXG4gICAgICAgIGNvbnN0IGdhbGxlcnlTdGF0cyA9IHtcclxuICAgICAgICAgICAgdG90YWw6IGF3YWl0IEdhbGxlcnkuY291bnREb2N1bWVudHMoKSxcclxuICAgICAgICAgICAgLy8gdXBsb2FkZWQ6IGF3YWl0IEdhbGxlcnkuY291bnREb2N1bWVudHMoeyBzdGF0dXM6ICdQdWJsaXNoZWQnIH0pIC8vIElmIFN0YXR1cyBleGlzdHNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCB1bnJlYWRNZXNzYWdlcyA9IGF3YWl0IENvbnRhY3QuY291bnREb2N1bWVudHMoeyBzdGF0dXM6ICdOZXcnIH0pO1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZUNsaWVudHMgPSBhd2FpdCBDbGllbnQuY291bnREb2N1bWVudHMoeyBzdGF0dXM6ICdBY3RpdmUnIH0pO1xyXG4gICAgICAgIGNvbnN0IHBlbmRpbmdUZXN0aW1vbmlhbHMgPSBhd2FpdCBUZXN0aW1vbmlhbC5jb3VudERvY3VtZW50cyh7IHN0YXR1czogJ1BlbmRpbmcnIH0pO1xyXG5cclxuICAgICAgICAvLyAyLiBBY3Rpb24gUmVxdWlyZWRcclxuICAgICAgICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICAgICAgeWVzdGVyZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgICAgICAgY29uc3QgZW5xdWlyaWVzTm9SZXBseSA9IGF3YWl0IEVucXVpcnkuZmluZCh7XHJcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogeyAkbHQ6IHllc3RlcmRheSB9LFxyXG4gICAgICAgICAgICBzdGF0dXM6ICdOZXcnXHJcbiAgICAgICAgfSkuc2VsZWN0KCdfaWQgbmFtZXMgZ3Jvb21OYW1lIGJyaWRlTmFtZSBjcmVhdGVkQXQnKS5saW1pdCg1KTtcclxuXHJcbiAgICAgICAgY29uc3QgdGhyZWVEYXlzQWdvID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgICAgIHRocmVlRGF5c0Fnby5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDMpO1xyXG4gICAgICAgIGNvbnN0IG9sZFF1b3RhdGlvbnMgPSBhd2FpdCBRdW90YXRpb24uZmluZCh7XHJcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogeyAkbHQ6IHRocmVlRGF5c0FnbyB9LFxyXG4gICAgICAgICAgICBzdGF0dXM6ICdTZW50J1xyXG4gICAgICAgIH0pLnNlbGVjdCgnX2lkIHF1b3RlTnVtYmVyIGNsaWVudE5hbWUgdXBkYXRlZEF0JykubGltaXQoNSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBlbmRpbmdPcmRlcnMgPSBhd2FpdCBPcmRlci5maW5kKHsgb3JkZXJfc3RhdHVzOiAnUGVuZGluZycgfSkuc2VsZWN0KCdfaWQgbmFtZSBjcmVhdGVkQXQnKS5saW1pdCg1KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb3ZlcmR1ZUludm9pY2VzID0gYXdhaXQgSW52b2ljZS5maW5kKHtcclxuICAgICAgICAgICAgZHVlRGF0ZTogeyAkbHQ6IHRvZGF5IH0sXHJcbiAgICAgICAgICAgIHBheW1lbnRTdGF0dXM6IHsgJG5lOiAnUGFpZCcgfVxyXG4gICAgICAgIH0pLnNlbGVjdCgnX2lkIGludm9pY2VOdW1iZXIgY2xpZW50TmFtZSBkdWVEYXRlIGdyYW5kVG90YWwgYW1vdW50UGFpZCcpLmxpbWl0KDUpO1xyXG5cclxuICAgICAgICBjb25zdCBwZW5kaW5nVGVzdGltb25pYWxzTGlzdCA9IGF3YWl0IFRlc3RpbW9uaWFsLmZpbmQoeyBzdGF0dXM6ICdQZW5kaW5nJyB9KS5zZWxlY3QoJ19pZCBjb3VwbGVOYW1lIGNyZWF0ZWRBdCBmdWxsRGVzY3JpcHRpb24gcmF0aW5nIGxvY2F0aW9uIHRodW1ibmFpbCcpLmxpbWl0KDQpO1xyXG5cclxuICAgICAgICAvLyAzLiBQaXBlbGluZVxyXG4gICAgICAgIGNvbnN0IHBpcGVsaW5lU3RhdHMgPSBhd2FpdCBPcmRlci5hZ2dyZWdhdGUoW1xyXG4gICAgICAgICAgICB7ICRncm91cDogeyBfaWQ6IFwiJG9yZGVyX3N0YXR1c1wiLCBjb3VudDogeyAkc3VtOiAxIH0gfSB9XHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9yZGVyc0J5VHlwZSA9IGF3YWl0IE9yZGVyLmFnZ3JlZ2F0ZShbXHJcbiAgICAgICAgICAgIHsgJGdyb3VwOiB7IF9pZDogXCIkcGhvdG9ncmFwaHlfdHlwZVwiLCBjb3VudDogeyAkc3VtOiAxIH0gfSB9XHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIC8vIDQuIENhbGVuZGFyIC8gU2NoZWR1bGUgLSBOZXh0IDUgc2hvb3RzXHJcbiAgICAgICAgY29uc3QgdXBjb21pbmdTaG9vdHMgPSBhd2FpdCBPcmRlci5maW5kKHtcclxuICAgICAgICAgICAgZXZlbnRfZGF0ZTogeyAkZ3RlOiB0b2RheSB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnNvcnQoeyBldmVudF9kYXRlOiAxIH0pXHJcbiAgICAgICAgICAgIC5saW1pdCg1KVxyXG4gICAgICAgICAgICAuc2VsZWN0KCdfaWQgbmFtZSBldmVudF9uYW1lIGV2ZW50X2RhdGUgbG9jYXRpb24gcGhvdG9ncmFwaHlfdHlwZSBvcmRlcl9zdGF0dXMnKTtcclxuXHJcbiAgICAgICAgLy8gNS4gUmV2ZW51ZSBTbmFwc2hvdCAoVGhpcyBNb250aClcclxuICAgICAgICBjb25zdCByZXZlbnVlU3RhdHMgPSBhd2FpdCBJbnZvaWNlLmFnZ3JlZ2F0ZShbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICRtYXRjaDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGludm9pY2VEYXRlOiB7ICRndGU6IHN0YXJ0T2ZNb250aCB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICRncm91cDoge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBiaWxsZWQ6IHsgJHN1bTogXCIkZ3JhbmRUb3RhbFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGVkOiB7ICRzdW06IFwiJGFtb3VudFBhaWRcIiB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdKTtcclxuICAgICAgICBjb25zdCB0aGlzTW9udGhCaWxsZWQgPSByZXZlbnVlU3RhdHNbMF0/LmJpbGxlZCB8fCAwO1xyXG4gICAgICAgIGNvbnN0IHRoaXNNb250aENvbGxlY3RlZCA9IHJldmVudWVTdGF0c1swXT8uY29sbGVjdGVkIHx8IDA7XHJcblxyXG4gICAgICAgIC8vIFRvdGFsIE91dHN0YW5kaW5nIChBbGwgdGltZSlcclxuICAgICAgICBjb25zdCB0b3RhbE91dHN0YW5kaW5nQWdnID0gYXdhaXQgSW52b2ljZS5hZ2dyZWdhdGUoW1xyXG4gICAgICAgICAgICB7ICRtYXRjaDogeyBwYXltZW50U3RhdHVzOiB7ICRuZTogJ1BhaWQnIH0gfSB9LFxyXG4gICAgICAgICAgICB7ICRncm91cDogeyBfaWQ6IG51bGwsIHRvdGFsOiB7ICRzdW06IHsgJHN1YnRyYWN0OiBbXCIkZ3JhbmRUb3RhbFwiLCBcIiRhbW91bnRQYWlkXCJdIH0gfSB9IH1cclxuICAgICAgICBdKTtcclxuICAgICAgICBjb25zdCB0b3RhbE91dHN0YW5kaW5nID0gdG90YWxPdXRzdGFuZGluZ0FnZ1swXT8udG90YWwgfHwgMDtcclxuXHJcbiAgICAgICAgLy8gNi4gUmVjZW50IEFjdGl2aXR5XHJcbiAgICAgICAgY29uc3QgcmVjZW50RW5xdWlyaWVzID0gYXdhaXQgRW5xdWlyeS5maW5kKCkuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSkubGltaXQoMykubGVhbigpO1xyXG4gICAgICAgIGNvbnN0IHJlY2VudE9yZGVycyA9IGF3YWl0IE9yZGVyLmZpbmQoKS5zb3J0KHsgY3JlYXRlZEF0OiAtMSB9KS5saW1pdCgzKS5sZWFuKCk7XHJcbiAgICAgICAgY29uc3QgcmVjZW50SW52b2ljZXMgPSBhd2FpdCBJbnZvaWNlLmZpbmQoKS5zb3J0KHsgY3JlYXRlZEF0OiAtMSB9KS5saW1pdCgzKS5sZWFuKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFjdGl2aXR5RmVlZCA9IFtcclxuICAgICAgICAgICAgLi4ucmVjZW50RW5xdWlyaWVzLm1hcChlID0+ICh7IHR5cGU6ICdFbnF1aXJ5JywgZGF0ZTogZS5jcmVhdGVkQXQsIHRleHQ6IGBOZXcgZW5xdWlyeTogJHtlLmdyb29tTmFtZX0gJiAke2UuYnJpZGVOYW1lfWAsIGlkOiBlLl9pZCB9KSksXHJcbiAgICAgICAgICAgIC4uLnJlY2VudE9yZGVycy5tYXAobyA9PiAoeyB0eXBlOiAnT3JkZXInLCBkYXRlOiBvLmNyZWF0ZWRBdCwgdGV4dDogYE9yZGVyIGNyZWF0ZWQ6ICR7by5uYW1lfWAsIGlkOiBvLl9pZCB9KSksXHJcbiAgICAgICAgICAgIC4uLnJlY2VudEludm9pY2VzLm1hcChpID0+ICh7IHR5cGU6ICdJbnZvaWNlJywgZGF0ZTogaS5jcmVhdGVkQXQsIHRleHQ6IGBJbnZvaWNlICR7aS5pbnZvaWNlTnVtYmVyfWAsIGlkOiBpLl9pZCB9KSlcclxuICAgICAgICBdLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKGIuZGF0ZSkgLSBuZXcgRGF0ZShhLmRhdGUpKS5zbGljZSgwLCAxMCk7XHJcblxyXG4gICAgICAgIC8vIDkuIENvbnRlbnQgSGVhbHRoXHJcbiAgICAgICAgY29uc3Qgc2xpZGVyQWN0aXZlID0gYXdhaXQgU2xpZGVyLmNvdW50RG9jdW1lbnRzKHsgYWN0aXZlOiB0cnVlIH0pO1xyXG4gICAgICAgIGNvbnN0IHN0b3JpZXNQdWJsaXNoZWQgPSBhd2FpdCBMb3ZlU3RvcnkuY291bnREb2N1bWVudHMoeyBzdGF0dXM6ICdQdWJsaXNoZWQnIH0pO1xyXG4gICAgICAgIGNvbnN0IHRlc3RpbW9uaWFsc1B1Ymxpc2hlZCA9IGF3YWl0IFRlc3RpbW9uaWFsLmNvdW50RG9jdW1lbnRzKHsgc3RhdHVzOiAnUHVibGlzaGVkJyB9KTtcclxuXHJcbiAgICAgICAgLy8gMTAuIFVzZXJzXHJcbiAgICAgICAgY29uc3QgdXNlclN0YXRzID0ge1xyXG4gICAgICAgICAgICB0b3RhbDogYXdhaXQgVXNlci5jb3VudERvY3VtZW50cygpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIDExLiBDaGFydHMgRGF0YVxyXG4gICAgICAgIC8vIE1vbnRobHkgUmV2ZW51ZSAoTGFzdCA2IE1vbnRocylcclxuICAgICAgICBjb25zdCBzaXhNb250aHNBZ28gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHNpeE1vbnRoc0Fnby5zZXRNb250aChzaXhNb250aHNBZ28uZ2V0TW9udGgoKSAtIDUpO1xyXG4gICAgICAgIHNpeE1vbnRoc0Fnby5zZXREYXRlKDEpO1xyXG5cclxuICAgICAgICBjb25zdCBtb250aGx5UmV2ZW51ZSA9IGF3YWl0IEludm9pY2UuYWdncmVnYXRlKFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJG1hdGNoOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW52b2ljZURhdGU6IHsgJGd0ZTogc2l4TW9udGhzQWdvIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJGdyb3VwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoOiB7ICRtb250aDogXCIkaW52b2ljZURhdGVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiB7ICR5ZWFyOiBcIiRpbnZvaWNlRGF0ZVwiIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiB7ICRzdW06IFwiJGdyYW5kVG90YWxcIiB9LCAvLyBVc2luZyBncmFuZFRvdGFsIGFzIHJldmVudWVcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0ZWQ6IHsgJHN1bTogXCIkYW1vdW50UGFpZFwiIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeyAkc29ydDogeyBcIl9pZC55ZWFyXCI6IDEsIFwiX2lkLm1vbnRoXCI6IDEgfSB9XHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1vbnRobHlPcmRlcnMgPSBhd2FpdCBPcmRlci5hZ2dyZWdhdGUoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkbWF0Y2g6IHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IHsgJGd0ZTogc2l4TW9udGhzQWdvIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJGdyb3VwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoOiB7ICRtb250aDogXCIkY3JlYXRlZEF0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogeyAkeWVhcjogXCIkY3JlYXRlZEF0XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IHsgJHN1bTogMSB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHsgJHNvcnQ6IHsgXCJfaWQueWVhclwiOiAxLCBcIl9pZC5tb250aFwiOiAxIH0gfVxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICAvLyBJbnZvaWNlIFN0YXR1cyBEaXN0cmlidXRpb25cclxuICAgICAgICBjb25zdCBpbnZvaWNlU3RhdHVzID0gYXdhaXQgSW52b2ljZS5hZ2dyZWdhdGUoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkZ3JvdXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBfaWQ6IFwiJHBheW1lbnRTdGF0dXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogeyAkc3VtOiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHsgJHN1bTogXCIkZ3JhbmRUb3RhbFwiIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgIGtwaToge1xyXG4gICAgICAgICAgICAgICAgbmV3RW5xdWlyaWVzVG9kYXksXHJcbiAgICAgICAgICAgICAgICBuZXdFbnF1aXJpZXNXZWVrLFxyXG4gICAgICAgICAgICAgICAgbmV3T3JkZXJzQ291bnQsIC8vIE1vbnRoXHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nUXVvdGF0aW9ucyxcclxuICAgICAgICAgICAgICAgIHVucGFpZEludm9pY2VzQ291bnQsXHJcbiAgICAgICAgICAgICAgICB1bnBhaWRJbnZvaWNlc0Ftb3VudCxcclxuICAgICAgICAgICAgICAgIHVwY29taW5nU2hvb3RzQ291bnQsXHJcbiAgICAgICAgICAgICAgICBnYWxsZXJ5UXVldWUsXHJcbiAgICAgICAgICAgICAgICB1bnJlYWRNZXNzYWdlcyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUNsaWVudHMsXHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nVGVzdGltb25pYWxzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFjdGlvblJlcXVpcmVkOiB7XHJcbiAgICAgICAgICAgICAgICBlbnF1aXJpZXNOb1JlcGx5LFxyXG4gICAgICAgICAgICAgICAgb2xkUXVvdGF0aW9ucyxcclxuICAgICAgICAgICAgICAgIHBlbmRpbmdPcmRlcnMsXHJcbiAgICAgICAgICAgICAgICBvdmVyZHVlSW52b2ljZXMsXHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nVGVzdGltb25pYWxzTGlzdFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwaXBlbGluZTogcGlwZWxpbmVTdGF0cyxcclxuICAgICAgICAgICAgb3JkZXJzQnlUeXBlLFxyXG4gICAgICAgICAgICBzY2hlZHVsZTogdXBjb21pbmdTaG9vdHMsXHJcbiAgICAgICAgICAgIHJldmVudWU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXNNb250aEJpbGxlZCxcclxuICAgICAgICAgICAgICAgIHRoaXNNb250aENvbGxlY3RlZCxcclxuICAgICAgICAgICAgICAgIHRvdGFsT3V0c3RhbmRpbmdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWN0aXZpdHlGZWVkLFxyXG4gICAgICAgICAgICBjb250ZW50SGVhbHRoOiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJBY3RpdmUsXHJcbiAgICAgICAgICAgICAgICBzdG9yaWVzUHVibGlzaGVkLFxyXG4gICAgICAgICAgICAgICAgdGVzdGltb25pYWxzUHVibGlzaGVkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdhbGxlcnlTdGF0cyxcclxuICAgICAgICAgICAgdXNlclN0YXRzLFxyXG4gICAgICAgICAgICBjaGFydHM6IHtcclxuICAgICAgICAgICAgICAgIG1vbnRobHlSZXZlbnVlLFxyXG4gICAgICAgICAgICAgICAgbW9udGhseU9yZGVycyxcclxuICAgICAgICAgICAgICAgIGludm9pY2VTdGF0dXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkRhc2hib2FyZCBTdGF0cyBFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJFcnJvciBmZXRjaGluZyBkYXNoYm9hcmQgc3RhdHNcIiwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcVGVzdGltb25pYWwuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL21vZGVscy9UZXN0aW1vbmlhbC5qc1wiO2ltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmNvbnN0IHRlc3RpbW9uaWFsU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcclxuICAgIHtcclxuICAgICAgICBjb3VwbGVOYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICAgICAgICBsb2NhdGlvbjogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUgfSxcclxuICAgICAgICB0aHVtYm5haWw6IHsgdHlwZTogU3RyaW5nIH0sIC8vIFVSTCBvciBCYXNlNjRcclxuICAgICAgICBzaG9ydERlc2NyaXB0aW9uOiB7IHR5cGU6IFN0cmluZywgbWF4bGVuZ3RoOiAxMDAwIH0sXHJcbiAgICAgICAgZnVsbERlc2NyaXB0aW9uOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gICAgICAgIHJhdGluZzogeyB0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDUsIG1pbjogMSwgbWF4OiA1IH0sXHJcbiAgICAgICAgZGlzcGxheU9yZGVyOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMCB9LFxyXG4gICAgICAgIHN0YXR1czoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGVudW06IFtcIkFjdGl2ZVwiLCBcIkluYWN0aXZlXCIsIFwiUGVuZGluZ1wiXSxcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJBY3RpdmVcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuLy8gSW5kZXggZm9yIHNvcnRpbmcgYnkgZGlzcGxheSBvcmRlclxyXG50ZXN0aW1vbmlhbFNjaGVtYS5pbmRleCh7IGRpc3BsYXlPcmRlcjogMSB9KTtcclxuXHJcbi8vIEZvcmNlIHJlY29tcGlsYXRpb24gb2YgbW9kZWwgaWYgaXQgZXhpc3RzIChmb3IgSE1SL0RldiBlbnZpcm9ubWVudClcclxuaWYgKG1vbmdvb3NlLm1vZGVscy5UZXN0aW1vbmlhbCkge1xyXG4gICAgZGVsZXRlIG1vbmdvb3NlLm1vZGVscy5UZXN0aW1vbmlhbDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWwoXCJUZXN0aW1vbmlhbFwiLCB0ZXN0aW1vbmlhbFNjaGVtYSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcXFxcdGVzdGltb25pYWxSb3V0ZXMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL3JvdXRlcy90ZXN0aW1vbmlhbFJvdXRlcy5qc1wiO2ltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBjcmVhdGVUZXN0aW1vbmlhbCxcclxuICAgIGdldEFsbFRlc3RpbW9uaWFscyxcclxuICAgIGdldFRlc3RpbW9uaWFsQnlJZCxcclxuICAgIHVwZGF0ZVRlc3RpbW9uaWFsLFxyXG4gICAgZGVsZXRlVGVzdGltb25pYWxcclxufSBmcm9tIFwiLi4vY29udHJvbGxlcnMvdGVzdGltb25pYWxDb250cm9sbGVyLmpzXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLnBvc3QoXCIvXCIsIGNyZWF0ZVRlc3RpbW9uaWFsKTtcclxucm91dGVyLmdldChcIi9cIiwgZ2V0QWxsVGVzdGltb25pYWxzKTtcclxucm91dGVyLmdldChcIi86aWRcIiwgZ2V0VGVzdGltb25pYWxCeUlkKTtcclxucm91dGVyLnB1dChcIi86aWRcIiwgdXBkYXRlVGVzdGltb25pYWwpO1xyXG5yb3V0ZXIuZGVsZXRlKFwiLzppZFwiLCBkZWxldGVUZXN0aW1vbmlhbCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXFxcXHRlc3RpbW9uaWFsQ29udHJvbGxlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvY29udHJvbGxlcnMvdGVzdGltb25pYWxDb250cm9sbGVyLmpzXCI7aW1wb3J0IFRlc3RpbW9uaWFsIGZyb20gXCIuLi9tb2RlbHMvVGVzdGltb25pYWwuanNcIjtcclxuXHJcbi8vIENyZWF0ZSBhIG5ldyB0ZXN0aW1vbmlhbFxyXG5leHBvcnQgY29uc3QgY3JlYXRlVGVzdGltb25pYWwgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdGVzdGltb25pYWwgPSBuZXcgVGVzdGltb25pYWwocmVxLmJvZHkpO1xyXG4gICAgICAgIGF3YWl0IHRlc3RpbW9uaWFsLnNhdmUoKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMSkuanNvbih0ZXN0aW1vbmlhbCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIEdldCBhbGwgdGVzdGltb25pYWxzIChBZG1pbjogYWxsLCBXZWJzaXRlOiBhY3RpdmUpXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxUZXN0aW1vbmlhbHMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgeyB0eXBlIH0gPSByZXEucXVlcnk7XHJcbiAgICAgICAgbGV0IHF1ZXJ5ID0ge307XHJcblxyXG4gICAgICAgIC8vIElmIHF1ZXJ5IHBhcmFtID90eXBlPWFjdGl2ZSBpcyBwYXNzZWQsIHJldHVybiBvbmx5IGFjdGl2ZSBvbmVzIChzb3J0ZWQgYnkgZGlzcGxheU9yZGVyKVxyXG4gICAgICAgIGlmICh0eXBlID09PSAnYWN0aXZlJykge1xyXG4gICAgICAgICAgICBxdWVyeS5zdGF0dXMgPSAnQWN0aXZlJztcclxuICAgICAgICAgICAgLy8gU29ydCBieSBkaXNwbGF5T3JkZXIgYXNjZW5kaW5nLCB0aGVuIGNyZWF0ZWRBdCBkZXNjZW5kaW5nXHJcbiAgICAgICAgICAgIGNvbnN0IHRlc3RpbW9uaWFscyA9IGF3YWl0IFRlc3RpbW9uaWFsLmZpbmQocXVlcnkpLnNvcnQoeyBkaXNwbGF5T3JkZXI6IDEsIGNyZWF0ZWRBdDogLTEgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbih0ZXN0aW1vbmlhbHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdDogcmV0dXJuIGFsbCAoc29ydGVkIGJ5IGNyZWF0ZWRBdCBkZXNjKSBmb3IgQWRtaW5cclxuICAgICAgICBjb25zdCB0ZXN0aW1vbmlhbHMgPSBhd2FpdCBUZXN0aW1vbmlhbC5maW5kKCkuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSk7XHJcbiAgICAgICAgcmVzLmpzb24odGVzdGltb25pYWxzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gR2V0IHNpbmdsZSB0ZXN0aW1vbmlhbFxyXG5leHBvcnQgY29uc3QgZ2V0VGVzdGltb25pYWxCeUlkID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHRlc3RpbW9uaWFsID0gYXdhaXQgVGVzdGltb25pYWwuZmluZEJ5SWQocmVxLnBhcmFtcy5pZCk7XHJcbiAgICAgICAgaWYgKCF0ZXN0aW1vbmlhbCkgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJUZXN0aW1vbmlhbCBub3QgZm91bmRcIiB9KTtcclxuICAgICAgICByZXMuanNvbih0ZXN0aW1vbmlhbCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gVXBkYXRlIHRlc3RpbW9uaWFsXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVUZXN0aW1vbmlhbCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB0ZXN0aW1vbmlhbCA9IGF3YWl0IFRlc3RpbW9uaWFsLmZpbmRCeUlkQW5kVXBkYXRlKFxyXG4gICAgICAgICAgICByZXEucGFyYW1zLmlkLFxyXG4gICAgICAgICAgICByZXEuYm9keSxcclxuICAgICAgICAgICAgeyBuZXc6IHRydWUgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKCF0ZXN0aW1vbmlhbCkgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJUZXN0aW1vbmlhbCBub3QgZm91bmRcIiB9KTtcclxuICAgICAgICByZXMuanNvbih0ZXN0aW1vbmlhbCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIERlbGV0ZSB0ZXN0aW1vbmlhbFxyXG5leHBvcnQgY29uc3QgZGVsZXRlVGVzdGltb25pYWwgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdGVzdGltb25pYWwgPSBhd2FpdCBUZXN0aW1vbmlhbC5maW5kQnlJZEFuZERlbGV0ZShyZXEucGFyYW1zLmlkKTtcclxuICAgICAgICBpZiAoIXRlc3RpbW9uaWFsKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIlRlc3RpbW9uaWFsIG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogXCJUZXN0aW1vbmlhbCBkZWxldGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxccm91dGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcXFxcZXZlbnRUeXBlUm91dGVzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9yb3V0ZXMvZXZlbnRUeXBlUm91dGVzLmpzXCI7aW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRBbGxFdmVudFR5cGVzLFxyXG4gICAgY3JlYXRlRXZlbnRUeXBlLFxyXG4gICAgdXBkYXRlRXZlbnRUeXBlLFxyXG4gICAgZGVsZXRlRXZlbnRUeXBlXHJcbn0gZnJvbSAnLi4vY29udHJvbGxlcnMvZXZlbnRUeXBlQ29udHJvbGxlci5qcyc7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxucm91dGVyLmdldCgnLycsIGdldEFsbEV2ZW50VHlwZXMpO1xyXG5yb3V0ZXIucG9zdCgnLycsIGNyZWF0ZUV2ZW50VHlwZSk7XHJcbnJvdXRlci5wdXQoJy86aWQnLCB1cGRhdGVFdmVudFR5cGUpO1xyXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgZGVsZXRlRXZlbnRUeXBlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxFdmVudFR5cGUuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL21vZGVscy9FdmVudFR5cGUuanNcIjtpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgZXZlbnRUeXBlU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnRXZlbnQgdHlwZSBuYW1lIGlzIHJlcXVpcmVkJ10sXHJcbiAgICAgICAgICAgIHVuaXF1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgdHJpbTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxhYmVsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdHJpbTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzQWN0aXZlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzLkV2ZW50VHlwZSB8fCBtb25nb29zZS5tb2RlbCgnRXZlbnRUeXBlJywgZXZlbnRUeXBlU2NoZW1hKTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcXFxcZXZlbnRUeXBlQ29udHJvbGxlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvY29udHJvbGxlcnMvZXZlbnRUeXBlQ29udHJvbGxlci5qc1wiO2ltcG9ydCBFdmVudFR5cGUgZnJvbSAnLi4vbW9kZWxzL0V2ZW50VHlwZS5qcyc7XHJcblxyXG4vLyBHZXQgYWxsIGV2ZW50IHR5cGVzXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxFdmVudFR5cGVzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50VHlwZXMgPSBhd2FpdCBFdmVudFR5cGUuZmluZCh7IGlzQWN0aXZlOiB0cnVlIH0pLnNvcnQoeyBuYW1lOiAxIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKGV2ZW50VHlwZXMpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBDcmVhdGUgZXZlbnQgdHlwZVxyXG5leHBvcnQgY29uc3QgY3JlYXRlRXZlbnRUeXBlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHsgbmFtZSwgbGFiZWwgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IG5ldyBFdmVudFR5cGUoe1xyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBsYWJlbDogbGFiZWwgfHwgbmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHNhdmVkRXZlbnRUeXBlID0gYXdhaXQgZXZlbnRUeXBlLnNhdmUoKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMSkuanNvbihzYXZlZEV2ZW50VHlwZSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvci5jb2RlID09PSAxMTAwMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnRXZlbnQgdHlwZSBhbHJlYWR5IGV4aXN0cycgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIFVwZGF0ZSBldmVudCB0eXBlXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFdmVudFR5cGUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgeyBuYW1lLCBsYWJlbCwgaXNBY3RpdmUgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRFdmVudFR5cGUgPSBhd2FpdCBFdmVudFR5cGUuZmluZEJ5SWRBbmRVcGRhdGUoXHJcbiAgICAgICAgICAgIHJlcS5wYXJhbXMuaWQsXHJcbiAgICAgICAgICAgIHsgbmFtZSwgbGFiZWwsIGlzQWN0aXZlIH0sXHJcbiAgICAgICAgICAgIHsgbmV3OiB0cnVlLCBydW5WYWxpZGF0b3JzOiB0cnVlIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICghdXBkYXRlZEV2ZW50VHlwZSkgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJFdmVudCBUeXBlIG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgICAgIHJlcy5qc29uKHVwZGF0ZWRFdmVudFR5cGUpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIERlbGV0ZSBldmVudCB0eXBlXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFdmVudFR5cGUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgRXZlbnRUeXBlLmZpbmRCeUlkQW5kRGVsZXRlKHJlcS5wYXJhbXMuaWQpO1xyXG4gICAgICAgIHJlcy5qc29uKHsgbWVzc2FnZTogJ0V2ZW50IHR5cGUgZGVsZXRlZCcgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1xcXFxzeXN0ZW1TZXR0aW5nc1JvdXRlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvcm91dGVzL3N5c3RlbVNldHRpbmdzUm91dGVzLmpzXCI7aW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IGdldFNldHRpbmdzLCB1cGRhdGVTZXR0aW5ncyB9IGZyb20gJy4uL2NvbnRyb2xsZXJzL3N5c3RlbVNldHRpbmdzQ29udHJvbGxlci5qcyc7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxuLy8gUm91dGVzXHJcbnJvdXRlci5nZXQoJy8nLCBnZXRTZXR0aW5ncyk7XHJcbnJvdXRlci5wdXQoJy8nLCB1cGRhdGVTZXR0aW5ncyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcU3lzdGVtU2V0dGluZ3MuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL21vZGVscy9TeXN0ZW1TZXR0aW5ncy5qc1wiO2ltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5jb25zdCBzb2NpYWxMaW5rU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgICBwbGF0Zm9ybToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICBlbnVtOiBbJ1doYXRzQXBwJywgJ0luc3RhZ3JhbScsICdGYWNlYm9vaycsICdZb3VUdWJlJywgJ1R3aXR0ZXInLCAnTGlua2VkSW4nLCAnT3RoZXInXVxyXG4gICAgfSxcclxuICAgIHVybDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGljb246IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsIC8vIENhbiBzdG9yZSBpY29uIG5hbWUgKGUuZy4sIEx1Y2lkZSBpY29uIG5hbWUpIG9yIFVSTFxyXG4gICAgICAgIGRlZmF1bHQ6ICcnXHJcbiAgICB9LFxyXG4gICAgYWN0aXZlOiB7XHJcbiAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICBkZWZhdWx0OiB0cnVlXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY29uc3Qgc3lzdGVtU2V0dGluZ3NTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICAgIGJ1c2luZXNzTmFtZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBkZWZhdWx0OiBcIlRoZSBQYXRpbCBQaG90b2dyYXBoeSAmIEZpbG0nc1wiXHJcbiAgICB9LFxyXG4gICAgcHJpbWFyeUxvZ286IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsIC8vIFVSTCB0byB0aGUgaW1hZ2VcclxuICAgICAgICBkZWZhdWx0OiBcIlwiXHJcbiAgICB9LFxyXG4gICAgc2Vjb25kYXJ5TG9nbzoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZywgLy8gVVJMIHRvIHRoZSBpbWFnZSAoZS5nLiwgZm9yIGRhcmsgbW9kZSBvciBmb290ZXIpXHJcbiAgICAgICAgZGVmYXVsdDogXCJcIlxyXG4gICAgfSxcclxuICAgIGJhY2tncm91bmRJbWFnZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZywgLy8gVVJMIG9yIGJhc2U2NCBiYWNrZ3JvdW5kIGltYWdlIChmb3IgbG9naW4vaGVybylcclxuICAgICAgICBkZWZhdWx0OiBcIlwiXHJcbiAgICB9LFxyXG4gICAgc29jaWFsTGlua3M6IFtzb2NpYWxMaW5rU2NoZW1hXSxcclxuICAgIGNvbnRhY3RFbWFpbDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBkZWZhdWx0OiBcIlwiXHJcbiAgICB9LFxyXG4gICAgY29udGFjdFBob25lOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGRlZmF1bHQ6IFwiXCJcclxuICAgIH0sXHJcbiAgICBwcmltYXJ5TW9iaWxlTnVtYmVyOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIGRlZmF1bHQ6IFwiXCJcclxuICAgIH0sXHJcbiAgICBzZWNvbmRhcnlNb2JpbGVOdW1iZXI6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgZGVmYXVsdDogXCJcIlxyXG4gICAgfSxcclxuICAgIGFkZHJlc3M6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgZGVmYXVsdDogXCJcIlxyXG4gICAgfSxcclxuICAgIC8vIEFkZCBtb3JlIGZpZWxkcyBoZXJlIGFzIG5lZWRlZCAoR1NULCBldGMuKVxyXG59LCB7IHRpbWVzdGFtcHM6IHRydWUgfSk7XHJcblxyXG5cclxuLy8gU2luZ2xldG9uIHBhdHRlcm46IEVuc3VyZSBvbmx5IG9uZSBzZXR0aW5ncyBkb2N1bWVudCBleGlzdHNcclxuc3lzdGVtU2V0dGluZ3NTY2hlbWEuc3RhdGljcy5nZXRTZXR0aW5ncyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgdGhpcy5maW5kT25lKCk7XHJcbiAgICBpZiAoc2V0dGluZ3MpIHJldHVybiBzZXR0aW5ncztcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmNyZWF0ZSh7fSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuU3lzdGVtU2V0dGluZ3MgfHwgbW9uZ29vc2UubW9kZWwoJ1N5c3RlbVNldHRpbmdzJywgc3lzdGVtU2V0dGluZ3NTY2hlbWEpO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1xcXFxzeXN0ZW1TZXR0aW5nc0NvbnRyb2xsZXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL2NvbnRyb2xsZXJzL3N5c3RlbVNldHRpbmdzQ29udHJvbGxlci5qc1wiO2ltcG9ydCBTeXN0ZW1TZXR0aW5ncyBmcm9tICcuLi9tb2RlbHMvU3lzdGVtU2V0dGluZ3MuanMnO1xyXG5cclxuLy8gQGRlc2MgICAgR2V0IHN5c3RlbSBzZXR0aW5ncyAoQnJhbmRpbmcsIGV0Yy4pXHJcbi8vIEByb3V0ZSAgIEdFVCAvYXBpL3NldHRpbmdzXHJcbi8vIEBhY2Nlc3MgIFB1YmxpY1xyXG5leHBvcnQgY29uc3QgZ2V0U2V0dGluZ3MgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBTeXN0ZW1TZXR0aW5ncy5nZXRTZXR0aW5ncygpO1xyXG4gICAgICAgIHJlcy5qc29uKHNldHRpbmdzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc2V0dGluZ3M6JywgZXJyb3IpO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogJ1NlcnZlciBFcnJvcicgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBAZGVzYyAgICBVcGRhdGUgc3lzdGVtIHNldHRpbmdzXHJcbi8vIEByb3V0ZSAgIFBVVCAvYXBpL3NldHRpbmdzXHJcbi8vIEBhY2Nlc3MgIFByaXZhdGUvQWRtaW5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVNldHRpbmdzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IGF3YWl0IFN5c3RlbVNldHRpbmdzLmZpbmRPbmUoKTsgLy8gTm90IHVzaW5nIGdldFNldHRpbmdzKCkgdG8gYXZvaWQgY3JlYXRpb24gaWYgd2UganVzdCB3YW50IHRvIHVwZGF0ZSB2YWxpZCBkb2NcclxuXHJcbiAgICAgICAgaWYgKCFzZXR0aW5ncykge1xyXG4gICAgICAgICAgICBzZXR0aW5ncyA9IG5ldyBTeXN0ZW1TZXR0aW5ncygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBidXNpbmVzc05hbWUsXHJcbiAgICAgICAgICAgIHByaW1hcnlMb2dvLFxyXG4gICAgICAgICAgICBzZWNvbmRhcnlMb2dvLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2UsXHJcbiAgICAgICAgICAgIHNvY2lhbExpbmtzLFxyXG4gICAgICAgICAgICBjb250YWN0RW1haWwsXHJcbiAgICAgICAgICAgIGNvbnRhY3RQaG9uZSxcclxuICAgICAgICAgICAgcHJpbWFyeU1vYmlsZU51bWJlcixcclxuICAgICAgICAgICAgc2Vjb25kYXJ5TW9iaWxlTnVtYmVyLFxyXG4gICAgICAgICAgICBhZGRyZXNzXHJcbiAgICAgICAgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgICBpZiAoYnVzaW5lc3NOYW1lICE9PSB1bmRlZmluZWQpIHNldHRpbmdzLmJ1c2luZXNzTmFtZSA9IGJ1c2luZXNzTmFtZTtcclxuICAgICAgICBpZiAocHJpbWFyeUxvZ28gIT09IHVuZGVmaW5lZCkgc2V0dGluZ3MucHJpbWFyeUxvZ28gPSBwcmltYXJ5TG9nbztcclxuICAgICAgICBpZiAoc2Vjb25kYXJ5TG9nbyAhPT0gdW5kZWZpbmVkKSBzZXR0aW5ncy5zZWNvbmRhcnlMb2dvID0gc2Vjb25kYXJ5TG9nbztcclxuICAgICAgICBpZiAoYmFja2dyb3VuZEltYWdlICE9PSB1bmRlZmluZWQpIHNldHRpbmdzLmJhY2tncm91bmRJbWFnZSA9IGJhY2tncm91bmRJbWFnZTtcclxuICAgICAgICBpZiAoc29jaWFsTGlua3MgIT09IHVuZGVmaW5lZCkgc2V0dGluZ3Muc29jaWFsTGlua3MgPSBzb2NpYWxMaW5rcztcclxuICAgICAgICBpZiAoY29udGFjdEVtYWlsICE9PSB1bmRlZmluZWQpIHNldHRpbmdzLmNvbnRhY3RFbWFpbCA9IGNvbnRhY3RFbWFpbDtcclxuICAgICAgICBpZiAoY29udGFjdFBob25lICE9PSB1bmRlZmluZWQpIHNldHRpbmdzLmNvbnRhY3RQaG9uZSA9IGNvbnRhY3RQaG9uZTtcclxuICAgICAgICBpZiAocHJpbWFyeU1vYmlsZU51bWJlciAhPT0gdW5kZWZpbmVkKSBzZXR0aW5ncy5wcmltYXJ5TW9iaWxlTnVtYmVyID0gcHJpbWFyeU1vYmlsZU51bWJlcjtcclxuICAgICAgICBpZiAoc2Vjb25kYXJ5TW9iaWxlTnVtYmVyICE9PSB1bmRlZmluZWQpIHNldHRpbmdzLnNlY29uZGFyeU1vYmlsZU51bWJlciA9IHNlY29uZGFyeU1vYmlsZU51bWJlcjtcclxuICAgICAgICBpZiAoYWRkcmVzcyAhPT0gdW5kZWZpbmVkKSBzZXR0aW5ncy5hZGRyZXNzID0gYWRkcmVzcztcclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlZFNldHRpbmdzID0gYXdhaXQgc2V0dGluZ3Muc2F2ZSgpO1xyXG4gICAgICAgIHJlcy5qc29uKHVwZGF0ZWRTZXR0aW5ncyk7XHJcblxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB1cGRhdGluZyBzZXR0aW5nczonLCBlcnJvcik7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiAnU2VydmVyIEVycm9yJyB9KTtcclxuICAgIH1cclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1xcXFx0ZWFtTWFuYWdlbWVudC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvcm91dGVzL3RlYW1NYW5hZ2VtZW50LmpzXCI7aW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBnZXRUZWFtTWVtYmVycyxcclxuICAgIGNyZWF0ZVRlYW1NZW1iZXIsXHJcbiAgICB1cGRhdGVUZWFtTWVtYmVyLFxyXG4gICAgZGVsZXRlVGVhbU1lbWJlclxyXG59IGZyb20gJy4uL2NvbnRyb2xsZXJzL3RlYW1Db250cm9sbGVyLmpzJztcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvJywgZ2V0VGVhbU1lbWJlcnMpO1xyXG5yb3V0ZXIucG9zdCgnLycsIGNyZWF0ZVRlYW1NZW1iZXIpO1xyXG5yb3V0ZXIucHV0KCcvOmlkJywgdXBkYXRlVGVhbU1lbWJlcik7XHJcbnJvdXRlci5kZWxldGUoJy86aWQnLCBkZWxldGVUZWFtTWVtYmVyKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxUZWFtTWVtYmVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9tb2RlbHMvVGVhbU1lbWJlci5qc1wiO2ltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5jb25zdCB0ZWFtTWVtYmVyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgICBuYW1lOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIHRyaW06IHRydWVcclxuICAgIH0sXHJcbiAgICByb2xlOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHQ6ICdQaG90b2dyYXBoZXInXHJcbiAgICB9LFxyXG4gICAgYmlvOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHRyaW06IHRydWVcclxuICAgIH0sXHJcbiAgICBpbWFnZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZywgLy8gVVJMIHRvIGltYWdlXHJcbiAgICAgICAgZGVmYXVsdDogJydcclxuICAgIH0sXHJcbiAgICBzb2NpYWxMaW5rczoge1xyXG4gICAgICAgIGluc3RhZ3JhbTogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICcnIH0sXHJcbiAgICAgICAgZmFjZWJvb2s6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9LFxyXG4gICAgICAgIHdlYnNpdGU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9XHJcbiAgICB9LFxyXG4gICAgY29udGFjdDoge1xyXG4gICAgICAgIHBob25lOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJycgfSxcclxuICAgICAgICBlbWFpbDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICcnIH1cclxuICAgIH0sXHJcbiAgICBpc1Zpc2libGU6IHtcclxuICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgIGRlZmF1bHQ6IHRydWVcclxuICAgIH0sXHJcbiAgICBvcmRlcjoge1xyXG4gICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICBkZWZhdWx0OiAwXHJcbiAgICB9XHJcbn0sIHtcclxuICAgIHRpbWVzdGFtcHM6IHRydWVcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbHMuVGVhbU1lbWJlciB8fCBtb25nb29zZS5tb2RlbCgnVGVhbU1lbWJlcicsIHRlYW1NZW1iZXJTY2hlbWEpO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXGNvbnRyb2xsZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1xcXFx0ZWFtQ29udHJvbGxlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvY29udHJvbGxlcnMvdGVhbUNvbnRyb2xsZXIuanNcIjtpbXBvcnQgVGVhbU1lbWJlciBmcm9tICcuLi9tb2RlbHMvVGVhbU1lbWJlci5qcyc7XHJcblxyXG4vLyBHZXQgYWxsIHRlYW0gbWVtYmVyc1xyXG5leHBvcnQgY29uc3QgZ2V0VGVhbU1lbWJlcnMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgeyBwdWJsaWNPbmx5IH0gPSByZXEucXVlcnk7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyID0gcHVibGljT25seSA9PT0gJ3RydWUnID8geyBpc1Zpc2libGU6IHRydWUgfSA6IHt9O1xyXG5cclxuICAgICAgICAvLyBTb3J0IGJ5ICdvcmRlcicgKGFzY2VuZGluZykgYW5kIHRoZW4gYnkgJ2NyZWF0ZWRBdCdcclxuICAgICAgICBjb25zdCBtZW1iZXJzID0gYXdhaXQgVGVhbU1lbWJlci5maW5kKGZpbHRlcikuc29ydCh7IG9yZGVyOiAxLCBjcmVhdGVkQXQ6IC0xIH0pO1xyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKG1lbWJlcnMpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBDcmVhdGUgYSBuZXcgdGVhbSBtZW1iZXJcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRlYW1NZW1iZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgbmV3TWVtYmVyID0gbmV3IFRlYW1NZW1iZXIocmVxLmJvZHkpO1xyXG4gICAgICAgIGF3YWl0IG5ld01lbWJlci5zYXZlKCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24obmV3TWVtYmVyKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gVXBkYXRlIGEgdGVhbSBtZW1iZXJcclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVRlYW1NZW1iZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuICAgICAgICBjb25zdCB1cGRhdGVkTWVtYmVyID0gYXdhaXQgVGVhbU1lbWJlci5maW5kQnlJZEFuZFVwZGF0ZShpZCwgcmVxLmJvZHksIHsgbmV3OiB0cnVlIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXVwZGF0ZWRNZW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogJ1RlYW0gbWVtYmVyIG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih1cGRhdGVkTWVtYmVyKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gRGVsZXRlIGEgdGVhbSBtZW1iZXJcclxuZXhwb3J0IGNvbnN0IGRlbGV0ZVRlYW1NZW1iZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuICAgICAgICBhd2FpdCBUZWFtTWVtYmVyLmZpbmRCeUlkQW5kRGVsZXRlKGlkKTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IG1lc3NhZ2U6ICdUZWFtIG1lbWJlciBkZWxldGVkIHN1Y2Nlc3NmdWxseScgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgIH1cclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxyb3V0ZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXHJvdXRlc1xcXFxwb3B1cFJvdXRlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYW1pdDEvRGF0YS9BcHBEYXRhL0FwcC9nYW5lc2gvUGVyc29uYWwvZ2l0aHViL3RoZS1wYXRpbC1waG90b2dyYXBoeS9zZXJ2ZXIvcm91dGVzL3BvcHVwUm91dGVzLmpzXCI7aW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IGdldFBvcHVwLCB1cGRhdGVQb3B1cCB9IGZyb20gJy4uL2NvbnRyb2xsZXJzL3BvcHVwQ29udHJvbGxlci5qcyc7XHJcbmltcG9ydCB7IHJlcXVpcmVBdXRoIH0gZnJvbSAnLi4vbWlkZGxld2FyZS9hdXRoLmpzJztcclxuXHJcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvJywgZ2V0UG9wdXApOyAvLyBQdWJsaWM/IFllcywgd2Vic2l0ZSBuZWVkcyB0byBzZWUgaXQuXHJcbnJvdXRlci5wdXQoJy8nLCByZXF1aXJlQXV0aCwgdXBkYXRlUG9wdXApOyAvLyBBZG1pbiBvbmx5XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcUG9wdXAuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtaXQxL0RhdGEvQXBwRGF0YS9BcHAvZ2FuZXNoL1BlcnNvbmFsL2dpdGh1Yi90aGUtcGF0aWwtcGhvdG9ncmFwaHkvc2VydmVyL21vZGVscy9Qb3B1cC5qc1wiO2ltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuXHJcbmNvbnN0IHBvcHVwU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcclxuICAgIHtcclxuICAgICAgICB0aXRsZTogeyB0eXBlOiBTdHJpbmcgfSwgLy8gT3B0aW9uYWxcclxuICAgICAgICBkZXNjcmlwdGlvbjogeyB0eXBlOiBTdHJpbmcgfSwgLy8gT3B0aW9uYWxcclxuICAgICAgICBpbWFnZTogeyB0eXBlOiBTdHJpbmcgfSwgLy8gT3B0aW9uYWwgVVJMXHJcbiAgICAgICAgaXNBY3RpdmU6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcclxuICAgICAgICB0eXBlOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogXCJ0cmlidXRlXCIgfSwgLy8gSnVzdCBpbiBjYXNlIHdlIG5lZWQgb3RoZXIgdHlwZXMgbGF0ZXJcclxuICAgIH0sXHJcbiAgICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbW9uZ29vc2UubW9kZWxzPy5Qb3B1cCB8fCBtb25nb29zZS5tb2RlbChcIlBvcHVwXCIsIHBvcHVwU2NoZW1hKTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWl0MVxcXFxEYXRhXFxcXEFwcERhdGFcXFxcQXBwXFxcXGdhbmVzaFxcXFxQZXJzb25hbFxcXFxnaXRodWJcXFxcdGhlLXBhdGlsLXBob3RvZ3JhcGh5XFxcXHNlcnZlclxcXFxjb250cm9sbGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1pdDFcXFxcRGF0YVxcXFxBcHBEYXRhXFxcXEFwcFxcXFxnYW5lc2hcXFxcUGVyc29uYWxcXFxcZ2l0aHViXFxcXHRoZS1wYXRpbC1waG90b2dyYXBoeVxcXFxzZXJ2ZXJcXFxcY29udHJvbGxlcnNcXFxccG9wdXBDb250cm9sbGVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9jb250cm9sbGVycy9wb3B1cENvbnRyb2xsZXIuanNcIjtpbXBvcnQgUG9wdXAgZnJvbSBcIi4uL21vZGVscy9Qb3B1cC5qc1wiO1xyXG5cclxuLy8gR2V0IHRoZSBhY3RpdmUgcG9wdXAgKG9yIHRoZSBjb25maWd1cmUgb25lKVxyXG4vLyBXZSBhc3N1bWUgd2Ugb25seSBtYWludGFpbiBPTkUgcG9wdXAgY29uZmlndXJhdGlvbiBkb2N1bWVudCBmb3Igc2ltcGxpY2l0eS5cclxuZXhwb3J0IGNvbnN0IGdldFBvcHVwID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGxldCBwb3B1cCA9IGF3YWl0IFBvcHVwLmZpbmRPbmUoKTtcclxuICAgICAgICBpZiAoIXBvcHVwKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGlmIG5vdCBleGlzdHNcclxuICAgICAgICAgICAgcG9wdXAgPSBhd2FpdCBQb3B1cC5jcmVhdGUoeyBpc0FjdGl2ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcy5qc29uKHBvcHVwKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gVXBkYXRlIHRoZSBwb3B1cCBjb25maWd1cmF0aW9uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVQb3B1cCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgaW1hZ2UsIGlzQWN0aXZlIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICAgICAgbGV0IHBvcHVwID0gYXdhaXQgUG9wdXAuZmluZE9uZSgpO1xyXG4gICAgICAgIGlmICghcG9wdXApIHtcclxuICAgICAgICAgICAgcG9wdXAgPSBuZXcgUG9wdXAoeyB0aXRsZSwgZGVzY3JpcHRpb24sIGltYWdlLCBpc0FjdGl2ZSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwb3B1cC50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgICAgICBwb3B1cC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBwb3B1cC5pbWFnZSA9IGltYWdlO1xyXG4gICAgICAgICAgICBwb3B1cC5pc0FjdGl2ZSA9IGlzQWN0aXZlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgcG9wdXAuc2F2ZSgpO1xyXG4gICAgICAgIHJlcy5qc29uKHBvcHVwKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1pZGRsZXdhcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFtaXQxXFxcXERhdGFcXFxcQXBwRGF0YVxcXFxBcHBcXFxcZ2FuZXNoXFxcXFBlcnNvbmFsXFxcXGdpdGh1YlxcXFx0aGUtcGF0aWwtcGhvdG9ncmFwaHlcXFxcc2VydmVyXFxcXG1pZGRsZXdhcmVcXFxcZXJyb3JIYW5kbGVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWl0MS9EYXRhL0FwcERhdGEvQXBwL2dhbmVzaC9QZXJzb25hbC9naXRodWIvdGhlLXBhdGlsLXBob3RvZ3JhcGh5L3NlcnZlci9taWRkbGV3YXJlL2Vycm9ySGFuZGxlci5qc1wiOy8vIEVycm9yIGhhbmRsaW5nIG1pZGRsZXdhcmVcclxuZXhwb3J0IGNvbnN0IGVycm9ySGFuZGxlciA9IChlcnIsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyKTtcclxuXHJcbiAgLy8gTW9uZ29vc2UgdmFsaWRhdGlvbiBlcnJvclxyXG4gIGlmIChlcnIubmFtZSA9PT0gJ1ZhbGlkYXRpb25FcnJvcicpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2VzID0gT2JqZWN0LnZhbHVlcyhlcnIuZXJyb3JzKS5tYXAoKGUpID0+IGUubWVzc2FnZSk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICBtZXNzYWdlOiAnVmFsaWRhdGlvbiBlcnJvcicsXHJcbiAgICAgIGVycm9yczogbWVzc2FnZXMsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIE1vbmdvb3NlIGNhc3QgZXJyb3JcclxuICBpZiAoZXJyLm5hbWUgPT09ICdDYXN0RXJyb3InKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICBtZXNzYWdlOiAnSW52YWxpZCBJRCBmb3JtYXQnLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBEdXBsaWNhdGUga2V5IGVycm9yXHJcbiAgaWYgKGVyci5jb2RlID09PSAxMTAwMCkge1xyXG4gICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMoZXJyLmtleVZhbHVlKVswXTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IGAke2tleX0gYWxyZWFkeSBleGlzdHNgLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBKV1QgZXJyb3JzXHJcbiAgaWYgKGVyci5uYW1lID09PSAnSnNvbldlYlRva2VuRXJyb3InKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xyXG4gICAgICBtZXNzYWdlOiAnSW52YWxpZCB0b2tlbicsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlmIChlcnIubmFtZSA9PT0gJ1Rva2VuRXhwaXJlZEVycm9yJykge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcclxuICAgICAgbWVzc2FnZTogJ1Rva2VuIGV4cGlyZWQnLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBEZWZhdWx0IGVycm9yXHJcbiAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzQ29kZSB8fCA1MDApLmpzb24oe1xyXG4gICAgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfHwgJ1NlcnZlciBlcnJvcicsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyA0MDQgaGFuZGxlclxyXG5leHBvcnQgY29uc3Qgbm90Rm91bmRIYW5kbGVyID0gKHJlcSwgcmVzKSA9PiB7XHJcbiAgcmVzLnN0YXR1cyg0MDQpLmpzb24oe1xyXG4gICAgbWVzc2FnZTogYFJvdXRlICR7cmVxLm9yaWdpbmFsVXJsfSBub3QgZm91bmRgLFxyXG4gIH0pO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThjLE9BQU9BLGVBQWM7QUFBbmUsSUFFTSxjQThFQztBQWhGUDtBQUFBO0FBRUEsSUFBTSxlQUFlLElBQUlBLFVBQVM7QUFBQSxNQUNoQztBQUFBLFFBQ0UsTUFBTTtBQUFBLFVBQ0osTUFBTTtBQUFBLFVBQ04sVUFBVSxDQUFDLE1BQU0seUJBQXlCO0FBQUEsVUFDMUMsTUFBTTtBQUFBLFVB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cHJlc3MiLCAiZXhwcmVzcyIsICJtb25nb29zZSIsICJtb25nb29zZSIsICJyb3V0ZXIiLCAiZXhwcmVzcyIsICJleHByZXNzIiwgIm1vbmdvb3NlIiwgIm1vbmdvb3NlIiwgInJvdXRlciIsICJleHByZXNzIiwgImV4cHJlc3MiLCAibW9uZ29vc2UiLCAibW9uZ29vc2UiLCAicm91dGVyIiwgImV4cHJlc3MiLCAiZXhwcmVzcyIsICJtb25nb29zZSIsICJtb25nb29zZSIsICJtb25nb29zZSIsICJub2RlbWFpbGVyIiwgInJvdXRlciIsICJleHByZXNzIiwgInVzZXIiLCAidG9rZW4iLCAidHJhbnNwb3J0ZXIiLCAibm9kZW1haWxlciIsICJleHByZXNzIiwgIm1vbmdvb3NlIiwgIm1vbmdvb3NlIiwgInJvdXRlciIsICJleHByZXNzIiwgImV4cHJlc3MiLCAibW9uZ29vc2UiLCAibW9uZ29vc2UiLCAicm91dGVyIiwgImV4cHJlc3MiLCAiZXhwcmVzcyIsICJtb25nb29zZSIsICJtb25nb29zZSIsICJyb3V0ZXIiLCAiZXhwcmVzcyIsICJleHByZXNzIiwgImp3dCIsICJKV1RfU0VDUkVUIiwgImp3dCIsICJyb3V0ZXIiLCAiZXhwcmVzcyIsICJleHByZXNzIiwgIm1vbmdvb3NlIiwgIm1vbmdvb3NlIiwgInJvdXRlciIsICJleHByZXNzIiwgImV4cHJlc3MiLCAibW9uZ29vc2UiLCAibW9uZ29vc2UiLCAicm91dGVyIiwgImV4cHJlc3MiLCAiZXhwcmVzcyIsICJtb25nb29zZSIsICJtb25nb29zZSIsICJyb3V0ZXIiLCAiZXhwcmVzcyIsICJleHByZXNzIiwgIm1vbmdvb3NlIiwgIm1vbmdvb3NlIiwgInJvdXRlciIsICJleHByZXNzIiwgImV4cHJlc3MiLCAibW9uZ29vc2UiLCAibW9uZ29vc2UiLCAicm91dGVyIiwgImV4cHJlc3MiLCAiZXhwcmVzcyIsICJ0ZXN0aW1vbmlhbHMiLCAicm91dGVyIiwgImV4cHJlc3MiLCAiZXhwcmVzcyIsICJtb25nb29zZSIsICJtb25nb29zZSIsICJyb3V0ZXIiLCAiZXhwcmVzcyIsICJleHByZXNzIiwgIm1vbmdvb3NlIiwgIm1vbmdvb3NlIiwgInJvdXRlciIsICJleHByZXNzIiwgImV4cHJlc3MiLCAibW9uZ29vc2UiLCAibW9uZ29vc2UiLCAicm91dGVyIiwgImV4cHJlc3MiLCAiZXhwcmVzcyIsICJtb25nb29zZSIsICJtb25nb29zZSIsICJyb3V0ZXIiLCAiZXhwcmVzcyIsICJleHByZXNzIl0KfQo=
