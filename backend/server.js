import express from "express";
import cors from "cors";

import routes from "./startups/routes.js";
import config from "./startups/config.js";
import db from "./startups/db.js";

const app = express();
app.use(cors());
app.use(express.json());

config(app);
db(app);
routes(app, express);
