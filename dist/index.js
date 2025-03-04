"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./Routes/user/authRoutes"));
const authRoutes_2 = __importDefault(require("./Routes/mech/authRoutes"));
const authRoutes_3 = __importDefault(require("./Routes/admin/authRoutes"));
const adminRoutes_1 = __importDefault(require("./Routes/admin/adminRoutes"));
const profileRoutes_1 = __importDefault(require("./Routes/user/profileRoutes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const corsOptions = {
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}
mongoose_1.default.connect('mongodb://localhost:27017/mech')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.use('/', authRoutes_1.default);
app.use('/', profileRoutes_1.default);
app.use('/mech', authRoutes_2.default);
app.use('/admin/auth', authRoutes_3.default);
app.use('/admin', adminRoutes_1.default);
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
