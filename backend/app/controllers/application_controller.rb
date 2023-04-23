# frozen_string_literal: true

require 'jwt'

class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  before_action :authenticate

  private

  def authenticate
    hmac_secret = ENV.fetch('SUPABASE_JWT_SECRET', nil)
    authenticate_or_request_with_http_token do |token, _options|
      decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
      fetch_current_user decoded_token
    end
  end

  def fetch_current_user(decoded_token)
    logger.info decoded_token[0]['sub']
    logger.info decoded_token
    @curernt_user = true
  end
end
