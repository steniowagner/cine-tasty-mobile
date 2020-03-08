describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('fake e2e test', async () => {
    await expect(element(by.id('discover'))).toBeVisible();
  });
});
