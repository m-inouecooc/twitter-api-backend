import express, { Application, Request, Response } from "express";
import { CommonService } from "../common";
import { MemberRegistrationDB } from "../../accessor/database-access/member-registration-access-db";
import { MemberRegistrationDto } from "../../classes/dtos/member-registration/member-registration-dto";
require("dotenv").config();
var log4js = require("log4js");
var logger = log4js.getLogger();

export class MemberRegistrationService {
  /**
   * 会員登録処理が行えるかを確認する処理
   * @param mailAddress
   * @returns
   */
  public static async memberRegistrationService(mailAddress: string) {
    try {
      console.log("既に会員登録済みのユーザーかチェック");
      const errorMessage = await MemberRegistrationDB.getAccountInfoSentence(
        mailAddress
      );
      console.log(errorMessage);
      console.log(errorMessage.length);
      if (errorMessage.length != 0) {
        return new MemberRegistrationDto(undefined, errorMessage);
      }

      console.log("メールアドレス登録履歴テーブルに登録");
      await MemberRegistrationDB.createAccountInfoSentence(
        mailAddress,
        CommonService.TeturnTimeStamp()
      );

      const completeMemberRegistration = "新規会員登録が完了しました";

      return new MemberRegistrationDto(
        completeMemberRegistration,
        errorMessage
      );
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**
   * 非同期で会員登録処理を行う
   * @param userName
   * @param password
   * @param mailAddress
   */
  public static async asyncMemberRegistrationService(
    userName: string,
    password: string,
    mailAddress: string
  ) {
    // 登録ステータスは1 入れるものを入れる、最後に登録ステータス2?
    console.log("非同期処理");

    try {
      // 会員登録処理
      await MemberRegistrationDB.createAccountInfo(
        userName,
        password,
        mailAddress,
        CommonService.TeturnTimeStamp()
      );
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
