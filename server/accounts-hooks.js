// Hook to create 2 lists after user create
Accounts.onCreateUser(function(options, user) {

  formatSlug = function(value) {
    var formatted = value
                    .toLowerCase()
                    .replace(/ /g,'-')
                    .replace(/[-]+/g, '-')
                    .replace(/[^\w\x80-\xFF-]+/g,'');
    return formatted;
  }

  var now = new Date().getTime();
  var wishListId = Lists.insert({
    userId: user._id,
    name: 'Wishes',
    funkoIds: [],
    created_at: new Date(now - 7 * 3600 * 1000),
    slug: formatSlug('Wishes')
  });
  var myFunkosListId = Lists.insert({
    userId: user._id,
    name: 'My Funkos',
    funkoIds: [],
    created_at: new Date(now - 7 * 3600 * 1000),
    slug: formatSlug('My Funkos')
  });
  if (options.profile)
    user.profile = options.profile;
  return user;
});
