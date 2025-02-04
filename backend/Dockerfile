# Rubyの公式イメージを使用（バージョンは必要に応じて調整）
FROM ruby:3.1.2

RUN apt-get update -qq && apt-get install -y nodejs yarn

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
