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

// describe('sendEmail', () => {
//   test('works: valid options', async () => {
//     console.log = jest.fn();
//     const options = { to: 'test@test.com', subject: 'Test Email', text: 'This is a test email' };
//     const didSend = await sendEmail(options);
//     expect(didSend).toBe(true);
//     expect(console.log).toHaveBeenCalled();
//   });

//   test('fails: missing options', async () => {
//     console.log = jest.fn();
//     const options = {};
//     const didSend = await sendEmail(options);
//     expect(didSend).toBe(false);
//     expect(console.log).toHaveBeenCalled();
//   });

//   test('fails: no options passed', async () => {
//     const didSend = await sendEmail();
//     expect(didSend).toBe(false);
//   })
// });