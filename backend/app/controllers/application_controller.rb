# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  before_action :authenticate

  # private

  def authenticate
    logger.info request.headers[:HTTP_AUTHORIZATION]
    authenticate_or_request_with_http_token do |token, _options|
      logger.info token
      true
    end
  end
end
