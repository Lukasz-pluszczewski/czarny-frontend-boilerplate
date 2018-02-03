import PropTypes from 'prop-types';

export const trans = PropTypes.shape({
  t: PropTypes.func.isRequired,
  n: PropTypes.func.isRequired,
  titleCase: PropTypes.func.isRequired,
  getLanguage: PropTypes.func.isRequired,
});

export const errors = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]),
  ])
);

export const isLoading = PropTypes.objectOf(PropTypes.bool);

export const loaded = PropTypes.objectOf(PropTypes.bool);

export const sidebarLinks = PropTypes.arrayOf(PropTypes.shape({
  to: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}));

export const formField = (fieldValueType = PropTypes.string) => PropTypes.shape({
  value: fieldValueType,
  error: PropTypes.string, // translatable string
  fromApi: PropTypes.oneOfType([fieldValueType, PropTypes.oneOf([false])]), // value from api or false
  errorFromApi: PropTypes.string, // translatable string from API
  errorDetailsFromApi: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // error details from API (all strings should be translatable)
  dirty: PropTypes.bool, // is value changed by the user (since default or since we got it from API)
});

export default {
  trans,
  errors,
  isLoading,
  loaded,
  sidebarLinks,
  formField,
};
