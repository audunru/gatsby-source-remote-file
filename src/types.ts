import { PluginOptions } from "gatsby";
import { CreateRemoteFileNodeArgs } from "gatsby-source-filesystem";

export const enum ErrorHandling {
  Warn = "warn",
  Fail = "fail",
}

export type RemotePluginOptions = PluginOptions &
  Pick<
    CreateRemoteFileNodeArgs,
    "url" | "parentNodeId" | "auth" | "httpHeaders" | "ext" | "name"
  > & { errorHandling: ErrorHandling };
