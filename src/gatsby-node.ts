import { SourceNodesArgs, PluginOptions } from 'gatsby';
import { createRemoteFileNode, CreateRemoteFileNodeArgs } from 'gatsby-source-filesystem';

export type RemotePluginOptions = PluginOptions &
  Pick<
    CreateRemoteFileNodeArgs,
    'url' | 'parentNodeId' | 'auth' | 'httpHeaders' | 'ext' | 'name' | 'reporter'
  >;

export const sourceNodes = (
  { actions: { createNode }, createNodeId, store, cache, reporter }: SourceNodesArgs,
  { url, name = 'remote', parentNodeId, ext, auth, httpHeaders }: RemotePluginOptions
) => {
  if (!url) throw new Error('Plugin option "url" is required');
  return createRemoteFileNode({
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
  });
};
