desc 'This task reseeds the guest account'
task seed_guest_account: :environment do
  'heroku run rake db: seed'
end
