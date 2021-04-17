import { mock, mockDeep } from "jest-mock-extended";
import { SourceNodesArgs } from "gatsby";
import { sourceNodes, RemotePluginOptions } from "../gatsby-node";

jest.mock("gatsby-source-filesystem", () => ({
  __esModule: true,
  default: "mockedDefaultExport",
  createRemoteFileNode: jest.fn().mockResolvedValue("mocked-file-node"),
}));

import { createRemoteFileNode } from "gatsby-source-filesystem";

describe("gatsby-source-remote-file options", () => {
  const sourceNodesArgs = mockDeep<SourceNodesArgs>();
  const pluginOptions = mock<RemotePluginOptions>();

  it("calls createRemoteFileNode with provided url", () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: "https://vandelay-industries.com/api/exports",
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "https://vandelay-industries.com/api/exports",
      })
    );
  });

  it("calls createRemoteFileNode with provided name", () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: "https://vandelay-industries.com/api/exports",
        name: "latex",
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "latex",
      })
    );
  });

  it("calls createRemoteFileNode with provided parentNodeId", () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: "https://vandelay-industries.com/api/exports",
        parentNodeId: "chips",
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        parentNodeId: "chips",
      })
    );
  });

  it("calls createRemoteFileNode with provided extension", () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: "https://vandelay-industries.com/api/exports",
        ext: ".bmp",
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        ext: ".bmp",
      })
    );
  });

  it("calls createRemoteFileNode with provided username and password", () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: "https://vandelay-industries.com/api/exports",
        auth: { htaccess_user: `art@vandelay-industries.com`, htaccess_pass: `I am an Architect` },
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        auth: { htaccess_user: `art@vandelay-industries.com`, htaccess_pass: `I am an Architect` },
      })
    );
  });

  it("calls createRemoteFileNode with provided headers", () => {
    sourceNodes(sourceNodesArgs, {
      ...pluginOptions,
      ...{
        url: "https://vandelay-industries.com/api/exports",
        httpHeaders: { Authorization: "Bearer someAccessToken" },
      },
    });

    expect(createRemoteFileNode).toHaveBeenCalledTimes(1);
    expect(createRemoteFileNode).toHaveBeenCalledWith(
      expect.objectContaining({
        httpHeaders: { Authorization: "Bearer someAccessToken" },
      })
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
