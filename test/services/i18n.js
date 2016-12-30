import { expect } from 'chai';
import { createTranslator } from 'services/i18n';

const exampleTranslations = {
  namespace1: {
    subNamespace11: {
      text: '1,11text',
    },
    subNamespace12: {
      text: '1,12text',
    }
  },
  namespace2: {
    subNamespace21: {
      text: '2,21text',
    },
  },
};

describe('i18n', () => {
  it('should set translations', () => {
    const translator = createTranslator();
    translator.setTranslations(exampleTranslations);
    expect(translator.translations).to.be.deep.equal(exampleTranslations);

  });
  it('should get translator that translate correct paths', () => {
    const translator = createTranslator(exampleTranslations);
    expect(translator.translate('namespace1.subNamespace11.text')).to.be.equal('1,11text');
  });
  it('should get translator that return another namespaced translator', () => {
    const translator = createTranslator(exampleTranslations);
    const namespacedTranslator = translator.translate('namespace1');
    expect(namespacedTranslator).to.be.a('function');
    expect(namespacedTranslator('subNamespace12.text')).to.be.equal('1,12text');
  });
});
