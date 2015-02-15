desc 'This task reseeds the guest account'
task seed_guest_account: :environment do
  Rake::Task["db:seed"].invoke
end
