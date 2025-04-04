const { param } = require('express-validator');
const ValidationHandler = require('../../../helper/validation_handler');
const $ = require('../../../locales/keys');
const User = require('../../../models/users_model');
const val = require('../../../helper/custon_validation');

function checkFollowerId() {
  return [
    param('followerId')
      .exists()
      .withMessage($.follower_id_field_is_required)
      .bail()
      .notEmpty()
      .withMessage($.follower_id_field_cannot_be_empty)
      .bail()
      .custom(value => {
        if (!val.validateObjectId(value)) {
          throw new Error($.follower_id_field_must_be_a_valid_object_id);
        }
        return true;
      })
      .bail()
      .custom(async value => {
        const existingUser = await User.findById(value);
        if (!existingUser) {
          throw new Error($.follower_id_field_must_correspond_to_an_existing_user);
        }
      }),

    ValidationHandler.handleValidationResult,
  ];
}

function checkFollowingId() {
  return [
    param('followingId')
      .exists()
      .withMessage($.following_id_field_is_required)
      .bail()
      .notEmpty()
      .withMessage($.following_id_field_cannot_be_empty)
      .bail()
      .custom(value => {
        if (!val.validateObjectId(value)) {
          throw new Error($.following_id_field_must_be_a_valid_object_id);
        }
        return true;
      })
      .bail()
      .custom(async value => {
        const existingUser = await User.findById(value);
        if (!existingUser) {
          throw new Error($.following_id_field_must_correspond_to_an_existing_user);
        }
      }),

    ValidationHandler.handleValidationResult,
  ];
}

module.exports = {
  checkFollowerId: checkFollowerId(),
  checkFollowingId: checkFollowingId(),
  ...ValidationHandler,
};
