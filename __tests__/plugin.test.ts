import { mock } from 'jest-mock-extended';
import { SourceNodesArgs } from 'gatsby';
import { sourceNodes, RemotePluginOptions } from '../src/gatsby-node';

jest.mock('gatsby-source-filesystem', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
  createRemoteFileNode: jest.fn(),
}));

import { createRemoteFileNode } from 'gatsby-source-filesystem';

describe('gatsby-source-remote-file', () => {
  const sourceNodesArgs = mock<SourceNodesArgs>();
  const pluginOptions = mock<RemotePluginOptions>();

  it('calls createRemoteFileNode with provided url', () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: 'https://vandelay-industries.com/api/exports',
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://vandelay-industries.com/api/exports',
      })
    );
  });

  it('calls createRemoteFileNode with provided name', () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        name: 'latex',
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'latex',
      })
    );
  });

  it('calls createRemoteFileNode with provided parentNodeId', () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        parentNodeId: 'chips',
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        parentNodeId: 'chips',
      })
    );
  });

  it('calls createRemoteFileNode with provided extension', () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        ext: '.bmp',
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        ext: '.bmp',
      })
    );
  });

  it('calls createRemoteFileNode with provided username and password', () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        // eslint-disable-next-line @typescript-eslint/camelcase
        auth: { htaccess_user: `art@vandelay-industries.com`, htaccess_pass: `I am an Architect` },
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/camelcase
        auth: { htaccess_user: `art@vandelay-industries.com`, htaccess_pass: `I am an Architect` },
      })
    );
  });

  it('calls createRemoteFileNode with provided headers', () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        httpHeaders: { Authorization: 'Bearer someAccessToken' },
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        httpHeaders: { Authorization: 'Bearer someAccessToken' },
      })
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
