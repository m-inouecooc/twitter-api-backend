import express, { Application, Request, Response } from "express";
import { MemberRegistrationRouter } from "./src/routers/member-registration/member-registration-router";

const app: Application = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    await MemberRegistrationRouter.memberRegistration(req, res);
  } catch (error) {
    console.error(error);
  }
});

try {
  app.listen(PORT, () => {
    console.log(`dev server running at: http://localhost:${PORT}/`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
