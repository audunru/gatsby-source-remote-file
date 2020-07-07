import { SourceNodesArgs, PluginOptions } from "gatsby";
import {
  createRemoteFileNode,
  CreateRemoteFileNodeArgs,
  FileSystemNode,
} from "gatsby-source-filesystem";

export type RemotePluginOptions = PluginOptions &
  Pick<
    CreateRemoteFileNodeArgs,
    "url" | "parentNodeId" | "auth" | "httpHeaders" | "ext" | "name" | "reporter"
  >;

const ERROR_URL_IS_MISSING = 'Plugin option "url" is required';
const SUCCESS_REMOTE_FILE_DOWNLOADED = "Remote file {0} was downloaded";

export const sourceNodes = (
  { actions: { createNode }, createNodeId, store, cache, reporter }: SourceNodesArgs,
  { url, name = "remote", parentNodeId, ext, auth, httpHeaders }: RemotePluginOptions
): Promise<FileSystemNode> => {
  if (!url) reporter.panicOnBuild(ERROR_URL_IS_MISSING, new Error(ERROR_URL_IS_MISSING));

  return new Promise<FileSystemNode>((resolve, reject) =>
    createRemoteFileNode({
      ...{
        url,
        store,
        cache,
        createNode,
        createNodeId,
        name,
        reporter,
      },
      ...(parentNodeId && { parentNodeId }),
      ...(ext && { ext }),
      ...(auth && { auth }),
      ...(httpHeaders && { httpHeaders }),
    })
      .then((file) => {
        reporter.success(SUCCESS_REMOTE_FILE_DOWNLOADED.replace("{0}", url));
        resolve(file);
      })
      .catch((error) => {
        reject(error);
      })
  );
};
