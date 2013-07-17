require 'sinatra'
require 'oj'

get '/' do
  erb :index
end

get '/sayings' do

  {
    question: "Hey?", response: "You Betcha!",
    question: "HEY!", response: "YO YO YO Quiet Down!",
  }.to_json

end