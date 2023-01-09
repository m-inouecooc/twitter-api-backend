import express, { Application, Request, Response } from "express";
import { MemberRegistrationController } from "../../controllers/member-registration/member-registration-controller";

export class MemberRegistrationRouter {
  public static async memberRegistration(req: Request, res: Response) {
    MemberRegistrationController.memberRegistrationController(req, res);
  }
}
