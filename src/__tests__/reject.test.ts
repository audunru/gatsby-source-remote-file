import { mock, mockDeep } from "jest-mock-extended";
import { SourceNodesArgs } from "gatsby";
import { sourceNodes, RemotePluginOptions } from "../gatsby-node";

jest.mock("gatsby-source-filesystem", () => ({
  __esModule: true,
  default: "mockedDefaultExport",
  createRemoteFileNode: jest.fn().mockRejectedValue("error"),
}));

describe("promise is rejected", () => {
  const sourceNodesArgs = mockDeep<SourceNodesArgs>();
  const pluginOptions = mock<RemotePluginOptions>();

  it("rejects whatever is rejected by createRemoteFileNode", async () => {
    expect(
      sourceNodes(sourceNodesArgs, {
        ...pluginOptions,
        ...{
          url: "https://vandelay-industries.com/api/exports",
        },
      })
    ).rejects.toEqual("error");
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
