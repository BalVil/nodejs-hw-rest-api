const { Contact } = require("../../models/contactModel");
const getContactById = require("./getContactById");

describe("Contacts controller getContactById test", () => {
  it("should retrieve one Contact by id and send response correctly", async () => {
    const mContactRecord = { _id: "123", owner: "abc" };
    jest.spyOn(Contact, "findOne").mockResolvedValueOnce(mContactRecord);

    const mReq = {
      params: { contactId: "123" },
      user: { _id: "abc" },
    };

    const mockResponse = () => {
      const res = {};
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    const mRes = mockResponse();
    await getContactById(mReq, mRes);

    expect(Contact.findOne).toBeCalledWith(mContactRecord);
    expect(mRes.json).toBeCalledWith(mContactRecord);
  });
});
