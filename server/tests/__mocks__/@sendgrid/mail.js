/*
Mocked out library and functions inside: const sgMail = require('@sendgrid/mail')
https://jestjs.io/docs/en/manual-mocks
 */

const { send } = require("@sendgrid/mail");

/* 
Mocked out functions inside
 */

module.exports = {
    setApiKey() {   // To make them blank function to just comply function calling

    },

    send() {    //Same blank and no email would be sent by JEST testing

    }
}