import { HitejianguanModule } from './hitejianguan.module';

describe('ClassmanagerModule', () => {
  let hitejianguanModule: HitejianguanModule;

  beforeEach(() => {
    hitejianguanModule = new HitejianguanModule();
  });

  it('should create an instance', () => {
    expect(hitejianguanModule).toBeTruthy();
  });
});
