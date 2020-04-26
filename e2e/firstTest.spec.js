describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('fake e2e test', async () => {
    await device.reloadReactNative();
    await expect(element(by.id('news-content-wrapper'))).toNotExist();
  });
});
