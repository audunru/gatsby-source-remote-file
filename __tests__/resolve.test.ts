import { mock, mockDeep } from 'jest-mock-extended';
import { SourceNodesArgs } from 'gatsby';
import { sourceNodes, RemotePluginOptions } from '../src/gatsby-node';

jest.mock('gatsby-source-filesystem', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
  createRemoteFileNode: jest.fn().mockResolvedValue('mocked-file-node'),
}));

describe('promise is resolved', () => {
  const sourceNodesArgs = mockDeep<SourceNodesArgs>();
  const pluginOptions = mock<RemotePluginOptions>();

  it('calls reporter.success after file has been downloaded', async () => {
    await sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: 'https://vandelay-industries.com/api/exports',
      },
    });
    expect(sourceNodesArgs.reporter.success).toBeCalledTimes(1);
    expect(sourceNodesArgs.reporter.success).toHaveBeenCalledWith(
      'Remote file https://vandelay-industries.com/api/exports was downloaded'
    );
  });

  it('resolves whatever is resolved by createRemoteFileNode', async () => {
    expect(
      sourceNodes(sourceNodesArgs, {
        ...pluginOptions,
        ...{
          url: 'https://vandelay-industries.com/api/exports',
        },
      })
    ).resolves.toEqual('mocked-file-node');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
