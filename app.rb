require 'sinatra'
require 'json'
require 'oj'

get '/' do
  erb :index
end

def sayings
  @sayings ||= [
    { question: "Hey?", response: "You Betcha!" },
    { question: "HEY!", response: "YO YO YO Quiet Down!" },
  ]
end

get '/sayings' do
  puts "Fetching"
  sayings.to_json
end

post '/sayings' do
  puts "Saving"
  puts params
end