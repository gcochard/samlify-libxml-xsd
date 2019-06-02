import * as mod from 'libxml-xsd';
import * as path from 'path';

const xsd = 'saml-schema-protocol-2.0.xsd';

export default {
  validate: (xml: string) => {
    return new Promise((resolve, reject) => {
      // https://github.com/albanm/node-libxml-xsd/issues/11
      process.chdir(path.resolve(__dirname, '../schemas'));
      mod.parseFile(path.resolve(xsd), (err, schema) => {
        if (err) {
          console.error('[ERROR] validateXML', err);
          return reject('ERR_INVALID_XML');
        }
        schema.validate(xml, (techErrors, validationErrors) => {
          if (techErrors !== null || validationErrors !== null) {
            console.error(`this is not a valid saml response with errors: ${validationErrors}`);
            return reject('ERR_EXCEPTION_VALIDATE_XML');
          }
          return resolve('SUCCESS_VALIDATE_XML');
        });
      });
    });
  }
};