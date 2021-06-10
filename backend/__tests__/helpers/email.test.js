const { sendEmail, createConfirmationEmail } = require('../../helpers/email');

describe('createConfirmationEmail', () => {
  test('works: valid email', () => {
    const email = 'test@test.com';
    const options = createConfirmationEmail(email);
    expect(options).toEqual({ to: email, subject: 'Yeti Email Confirmation', text: expect.any(String) });
  });

  test('fails: no email', () => {
    const options = createConfirmationEmail();
    expect(options).toEqual(undefined);
  });

  test('fails: email of invalid type', () => {
    const emails = [7, true, 4.3];
    for (let email of emails) {
      const options = createConfirmationEmail(email);
      expect(options).toEqual(undefined);
    }
  });
});