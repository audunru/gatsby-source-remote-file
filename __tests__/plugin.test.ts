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

  it('throws error if url is undefined', () => {
    expect(() => {
      sourceNodes(sourceNodesArgs, {
        ...pluginOptions,
        ...{
          url: undefined,
        },
      });
    }).toThrow(new Error('Plugin option "url" is required'));
  });

  it('throws error if url is null', () => {
    expect(() => {
      sourceNodes(sourceNodesArgs, {
        ...pluginOptions,
        ...{
          url: null,
        },
      });
    }).toThrow(new Error('Plugin option "url" is required'));
  });

  it('throws error if url is empty string', () => {
    expect(() => {
      sourceNodes(sourceNodesArgs, {
        ...pluginOptions,
        ...{
          url: '',
        },
      });
    }).toThrow(new Error('Plugin option "url" is required'));
  });

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
        url: 'https://vandelay-industries.com/api/exports',
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
        url: 'https://vandelay-industries.com/api/exports',
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
        url: 'https://vandelay-industries.com/api/exports',
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
        url: 'https://vandelay-industries.com/api/exports',
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
        url: 'https://vandelay-industries.com/api/exports',
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
