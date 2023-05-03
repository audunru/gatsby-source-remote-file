import { mock, mockDeep } from "jest-mock-extended";
import { SourceNodesArgs } from "gatsby";
import { sourceNodes } from "../gatsby-node";
import { RemotePluginOptions } from "../types";

jest.mock("gatsby-source-filesystem", () => ({
  __esModule: true,
  default: "mockedDefaultExport",
  createRemoteFileNode: jest.fn().mockResolvedValue("mocked-file-node"),
}));

describe("validation", () => {
  const sourceNodesArgs = mockDeep<SourceNodesArgs>();
  const pluginOptions = mock<RemotePluginOptions>();

  it("calls reporter.panicOnBuild if url is undefined", () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: undefined as unknown as string,
      },
    });
    expect(sourceNodesArgs.reporter.panicOnBuild).toBeCalledTimes(1);
    expect(sourceNodesArgs.reporter.panicOnBuild).toHaveBeenCalledWith(
      'Plugin option "url" is required',
      new Error('Plugin option "url" is required')
    );
  });

  it("calls reporter.panicOnBuild if url is null", () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: null as unknown as string,
      },
    });
    expect(sourceNodesArgs.reporter.panicOnBuild).toBeCalledTimes(1);
    expect(sourceNodesArgs.reporter.panicOnBuild).toHaveBeenCalledWith(
      'Plugin option "url" is required',
      new Error('Plugin option "url" is required')
    );
  });

  it("calls reporter.panicOnBuild if url is empty string", () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: "",
      },
    });
    expect(sourceNodesArgs.reporter.panicOnBuild).toBeCalledTimes(1);
    expect(sourceNodesArgs.reporter.panicOnBuild).toHaveBeenCalledWith(
      'Plugin option "url" is required',
      new Error('Plugin option "url" is required')
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
