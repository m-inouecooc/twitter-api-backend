import express, { Application, Request, Response } from "express";
import { MemberRegistrationService } from "../../services/member-registration/member-registration-service";

export class MemberRegistrationController {
  public static async memberRegistrationController(
    req: Request,
    res: Response
  ) {
    try {
      if (!req.query) {
        // TODO エラー返却
      }

      MemberRegistrationService.memberRegistrationService(req, res);
    } catch (error: any) {
      new Error(error);
    }
  }
}
