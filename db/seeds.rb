user = User.find_by(username: 'worldtraveler')
user.destroy if user

Album.create!([
  {owner_id: 1, title: "Philadelphia - The Journey Begins!", location_id: "ChIJ60u11Ni3xokRwVg-jNgU9Yk", description: "May 21-July 31, 1804\r\n\r\nHaving started upstream on the Missouri River from their St. Louis-area camp—where they had been preparing for the expedition since fall 1803—on May 14, William Clark and nearly four dozen other men met up with Meriwether Lewis on May 20. The Lewis and Clark expedition—\"the Corps of Discovery\"—began making its way up the Missouri aboard a 55-foot-long (17-meter-long) keelboat and two smaller pirogues. As they traveled, Clark spent most of his time on the keelboat, charting the course and making maps, while Lewis was often ashore, studying the rock formations, soil, animals, and plants along the way.\r\n\r\nAlways the members of the expedition were on the lookout for Indians, hoping they would be peaceable, armed in case they weren't. For security, Lewis and Clark made camp on river islands whenever possible and posted guards at night. By the end of July they had traveled more than 600 miles (1,110 kilometers) up the river. Still they had not met a single Indian."},
  {owner_id: 1, title: "The Great Plains - Heading Into Danger", location_id: "ChIJHa4yoSf0t1IR53T-C55D0yY", description: "August 01-31, 1804\r\n\r\nAt sunset on August 2, a party of Oto and Missouri Indians arrived at the expedition's camp. This first Indian encounter went well, the two sides exchanging greetings and gifts. But the captains realized that things would be different when they met the Sioux. President Jefferson had specifically mentioned the need to make a friendly impression on this powerful tribe.\r\n\r\nDuring this time, Sergeant Charles Floyd became the first U.S. soldier to die west of the Mississippi when he died on August 20, probably of appendicitis. He was the only member of the Corps to die along the journey.\r\n\r\nBy the final week of August, Lewis and Clark had reached the eastern edge of the Great Plains, a virtual Eden abounding in elk, deer, buffalo, and beaver. They were now heading toward the heart of Sioux territory.\r\n\r\nThe expedition first encountered the Yankton Sioux, a more peaceable people than their neighbors farther up the Missouri, the Teton Sioux. The Yankton were somewhat disappointed by the gifts they received—a mere five medals—and warned the Americans about the reception they would receive upriver."},
  {owner_id: 1, title: "Dakota - Racing Against Winter's Approach", location_id: "ChIJY-nYVxKD11IRyc9egzmahA0", description: "October 01-December 20, 1804\r\n\r\nLewis and Clark were keen to cover as many miles as possible before the Missouri froze. Four days after the first snowfall, they reached the Mandan tribe’s villages, where they planned to spend the winter.\r\n\r\nWithout delay the expedition members began to build a fort—protection against both the bitter northern winter and attack by the Sioux. Before the end of November, when ice was already running in the river, the fort was finished. Temperatures dipped to below 0ºF (-18ºC), and guards, posted around the clock, had to be relieved every half hour.\r\n\r\nThe expedition's food supplies soon began to dwindle. To make it through the winter, the captains would have to find a supply of meat for the men."},
  {owner_id: 1, title: "Rockies - Rockies in Sight", location_id: "ChIJJTA4pPahaocR69bVJeUXFF0", description: "May 04-28, 1805\r\n\r\nIn early May the expedition almost lost one of its two pirogues when a sudden gust of wind caught the sails and heeled the vessel over on its side. Only quick action by Sacagawea, who was riding in the vessel, saved precious journals and supplies that otherwise would have been lost. The young woman reached into the river and retrieved as much as she could.\r\n\r\nBy now Lewis and Clark were growing ever more anxious to catch sight of the Rockies, the mountain barrier they knew they would have to cross. In the last week of May, Lewis saw the mountains for the first time. He was filled with joy, immediately tempered by a realization of the challenge that lay ahead.\r\n\r\nThe captains were eager to reach the Rockies, but progress was slow along the frequently bending river, which was now shallow and filled with jutting rocks."}
])
Location.create!([
  {street_number: nil, street: "Philadelphia", city: "Philadelphia County", state: "PA", country: "US", place_id: "ChIJ60u11Ni3xokRwVg-jNgU9Yk", name: "Philadelphia"},
  {street_number: nil, street: nil, city: nil, state: "Mississippi River", country: "US", place_id: "ChIJHa4yoSf0t1IR53T-C55D0yY", name: "Mississippi River"},
  {street_number: nil, street: nil, city: nil, state: "ND", country: "US", place_id: "ChIJY-nYVxKD11IRyc9egzmahA0", name: "North Dakota"},
  {street_number: nil, street: "Black Cloud Trail", city: "Buena Vista", state: "CO", country: "US", place_id: "ChIJJTA4pPahaocR69bVJeUXFF0", name: "Rocky Mountains"}
])
Photo.create!([
  {album_id: 1, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862869/2185-1274886479COqR_f4ty41.jpg", cloudinary_id: "2185-1274886479COqR_f4ty41", location_id: nil},
  {album_id: 1, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862870/chickadee_y45tbd.jpg", cloudinary_id: "chickadee_y45tbd", location_id: nil},
  {album_id: 1, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862870/chinatown-dragon_mi1mwv.jpg", cloudinary_id: "chinatown-dragon_mi1mwv", location_id: nil},
  {album_id: 1, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862870/cloud-in-philly-1389217150Ov6_urpkdu.jpg", cloudinary_id: "cloud-in-philly-1389217150Ov6_urpkdu", location_id: nil},
  {album_id: 1, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862900/independence-hall_mtq0x6.jpg", cloudinary_id: "independence-hall_mtq0x6", location_id: nil},
  {album_id: 1, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862871/mcclellan-statue_cgjodp.jpg", cloudinary_id: "mcclellan-statue_cgjodp", location_id: nil},
  {album_id: 1, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862871/philadelphia-pa-1395585018Htj_izxhce.jpg", cloudinary_id: "philadelphia-pa-1395585018Htj_izxhce", location_id: nil},
  {album_id: 1, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862872/philadelphia-pa-1416151955Bom_hulyar.jpg", cloudinary_id: "philadelphia-pa-1416151955Bom_hulyar", location_id: nil},
  {album_id: 1, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862872/philadelphia-pa_idmdda.jpg", cloudinary_id: "philadelphia-pa_idmdda", location_id: nil},
  {album_id: 1, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862872/philadelphia-skyline_he0jq3.jpg", cloudinary_id: "philadelphia-skyline_he0jq3", location_id: nil},
  {album_id: 2, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423863381/destroyed-home-in-great-plains_i6ztn3.jpg", cloudinary_id: "destroyed-home-in-great-plains_i6ztn3", location_id: nil},
  {album_id: 2, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423863381/dirt-road-into-the-wilderness_asdusq.jpg", cloudinary_id: "dirt-road-into-the-wilderness_asdusq", location_id: nil},
  {album_id: 2, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423863381/great-blue-heron-1421078067ri4_cwrmad.jpg", cloudinary_id: "great-blue-heron-1421078067ri4_cwrmad", location_id: nil},
  {album_id: 2, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423863381/great-gray-owl-1412179384zau_yzclxc.jpg", cloudinary_id: "great-gray-owl-1412179384zau_yzclxc", location_id: nil},
  {album_id: 2, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423863380/great-heron-flying_rnonwt.jpg", cloudinary_id: "great-heron-flying_rnonwt", location_id: nil},
  {album_id: 2, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423863381/oklahoma-sunset-wheat-plains_lg2jgq.jpg", cloudinary_id: "oklahoma-sunset-wheat-plains_lg2jgq", location_id: nil},
  {album_id: 2, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423863382/plains-indians-teepee-tipi_a9hgpq.jpg", cloudinary_id: "plains-indians-teepee-tipi_a9hgpq", location_id: nil},
  {album_id: 2, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423863382/storms-on-the-plains_wmzlur.jpg", cloudinary_id: "storms-on-the-plains_wmzlur", location_id: nil},
  {album_id: 2, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423863382/thunderstorm-over-town_ypfan4.jpg", cloudinary_id: "thunderstorm-over-town_ypfan4", location_id: nil},
  {album_id: 3, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423864694/black-hills_gccp3c.jpg", cloudinary_id: "black-hills_gccp3c", location_id: nil},
  {album_id: 3, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423864700/crazy-horse_enrl1s.jpg", cloudinary_id: "crazy-horse_enrl1s", location_id: nil},
  {album_id: 3, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423864707/the-dakota_q9mwac.jpg", cloudinary_id: "the-dakota_q9mwac", location_id: nil},
  {album_id: 3, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423864704/mount-rushmore-profile_f70nty.jpg", cloudinary_id: "mount-rushmore-profile_f70nty", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866687/blue-wildflowers-in-rockies_bikpfr.jpg", cloudinary_id: "blue-wildflowers-in-rockies_bikpfr", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866693/foothills-of-rocky-mountains_dyhhk2.jpg", cloudinary_id: "foothills-of-rocky-mountains_dyhhk2", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866692/mountain-lake-1387908068WxA_tnd0o7.jpg", cloudinary_id: "mountain-lake-1387908068WxA_tnd0o7", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866697/pink-flowers-on-ridge_i4qrob.jpg", cloudinary_id: "pink-flowers-on-ridge_i4qrob", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866696/ranch-in-western-mountains_bsauy4.jpg", cloudinary_id: "ranch-in-western-mountains_bsauy4", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866704/river-runs-through-yellowstone_rzpl0n.jpg", cloudinary_id: "river-runs-through-yellowstone_rzpl0n", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866703/rockies-in-montana_ywfuoa.jpg", cloudinary_id: "rockies-in-montana_ywfuoa", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866704/streaming-rapids-in-mountains_v7jnio.jpg", cloudinary_id: "streaming-rapids-in-mountains_v7jnio", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866708/sunburst-over-barbed-wire_biqytw.jpg", cloudinary_id: "sunburst-over-barbed-wire_biqytw", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866708/train-car_h5nozo.jpg", cloudinary_id: "train-car_h5nozo", location_id: nil},
  {album_id: 4, caption: "", order: 0, photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423866712/winding-wyoming-stream_jakq0g.jpg", cloudinary_id: "winding-wyoming-stream_jakq0g", location_id: nil}
])

User.create!([
  {first_name: "Lewis", last_name: "Clark", username: "worldtraveler", password_digest: "$2a$10$TV6qOQc3v/wtrCXfdcPfnOzhFBedIqZkU1CTK/WRKPPOOylwvwYWm", session_token: "Dd5ZPQ7iPzNUHskqjjKIDw"}
])

user = User.find_by(username: 'worldtraveler')
user.update(id: '1')
user = Album.find_by(title: 'Philadelphia - The Journey Begins!')
user.update(id: '1')
user = Album.find_by(title: 'The Great Plains - Heading Into Danger')
user.update(id: '2')
user = Album.find_by(title: "Dakota - Racing Against Winter's Approach")
user.update(id: '3')
user = Album.find_by(title: 'Rockies - Rockies in Sight')
user.update(id: '4')
