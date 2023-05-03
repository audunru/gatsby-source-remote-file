import { mock, mockDeep } from "jest-mock-extended";
import { Reporter, SourceNodesArgs } from "gatsby";
import { sourceNodes, RemotePluginOptions } from "../gatsby-node";

jest.mock("gatsby-source-filesystem", () => ({
  __esModule: true,
  default: "mockedDefaultExport",
  createRemoteFileNode: jest.fn().mockRejectedValue("error"),
}));

const sourceNodesArgs = mockDeep<SourceNodesArgs>();
const pluginOptions = mock<RemotePluginOptions>();

describe("given that sourceNodes is called", () => {
  describe("when errorHandling is not specified", () => {
    it("the promise is rejected", async () => {
      await expect(
        sourceNodes(sourceNodesArgs, {
          ...pluginOptions,
          url: "https://vandelay-industries.com/api/exports",
        })
      ).rejects.toEqual("error");
    });
  });

  describe("when errorHandling is Reject", () => {
    it("the promise is rejected", async () => {
      await expect(
        sourceNodes(sourceNodesArgs, {
          ...pluginOptions,
          url: "https://vandelay-industries.com/api/exports",
          errorHandling: "fail",
        })
      ).rejects.toEqual("error");
    });
  });

  describe("when errorHandling is Warn", () => {
    it("the error is reported as a warning and the promise is not rejected", async () => {
      const mockReporter = {
        warn: jest.fn(),
      } as unknown as Reporter;
      await expect(
        sourceNodes(
          { ...sourceNodesArgs, reporter: mockReporter },
          {
            ...pluginOptions,
            url: "https://vandelay-industries.com/api/exports",
            errorHandling: "warn",
          }
        )
      ).resolves.toBeUndefined();

      expect(mockReporter.warn).toHaveBeenCalledTimes(1);
      expect(mockReporter.warn).toHaveBeenCalledWith("error");
    });
  });
});
