import { SourceNodesArgs } from "gatsby";
import { createRemoteFileNode, FileSystemNode } from "gatsby-source-filesystem";
import { ErrorHandling, RemotePluginOptions } from "./types";

const ERROR_URL_IS_MISSING = 'Plugin option "url" is required';
const SUCCESS_REMOTE_FILE_DOWNLOADED = "Remote file {0} was downloaded";

export const sourceNodes = (
  { actions: { createNode }, createNodeId, store, cache, reporter }: SourceNodesArgs,
  {
    url,
    name = "remote",
    parentNodeId,
    ext,
    auth,
    httpHeaders,
    errorHandling = ErrorHandling.Fail,
  }: RemotePluginOptions
): Promise<FileSystemNode | void> => {
  if (!url) reporter.panicOnBuild(ERROR_URL_IS_MISSING, new Error(ERROR_URL_IS_MISSING));

  return new Promise<FileSystemNode | void>((resolve, reject) =>
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
        switch (errorHandling) {
          case ErrorHandling.Warn:
            reporter.warn(error);
            resolve();
          case ErrorHandling.Fail:
            reject(error);
        }
      })
  );
};
