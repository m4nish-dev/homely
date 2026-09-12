import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Property from '../models/Property.js';
import connectDB from '../config/db.js';

dotenv.config();

const imagesByCategory = {
  Hotels: [
    [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1559508551-44bff1de756b?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1594563703937-fdc640497dcd?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1524781289445-ddf8d5695dcd?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1628592102751-ba83b0314276?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1521783988139-89397d761dce?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1614649024145-7f847b8c4e25?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1603194772606-2e45c5c0cf5c?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1630660664869-c9d3cc676880?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1200&q=80', publicId: 'mock' },
    ],
  ],
  Villas: [
    [
      { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1599685315640-4a346a7ce48b?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600047508788-786f3865b07a?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1614030424754-24d0eebd46b2?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1617104678098-de229db51175?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600047508788-786f3865b07a?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80', publicId: 'mock' },
    ],
  ],
  Flats: [
    [
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1569152811536-fb47aced8409?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80', publicId: 'mock' },
    ],
  ],
  Resorts: [
    [
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1200&q=80', publicId: 'mock' },
    ],
  ],
  Cabins: [
    [
      { url: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1475688621402-4257c812d6db?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1542718610-a1a4723b7f94?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1542718610-a1a4723b7f94?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1475688621402-4257c812d6db?w=1200&q=80', publicId: 'mock' },
    ],
    [
      { url: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?w=1200&q=80', publicId: 'mock' },
      { url: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=1200&q=80', publicId: 'mock' },
    ],
  ],
};

const descriptions = {
  Hotels: "Experience world-class hospitality in our premium hotels. Enjoy luxurious rooms, daily housekeeping, 24/7 room service, and stunning city views right from your window.",
  Villas: "Indulge in the finest luxury at this sprawling villa, complete with a private pool, lush garden, and elegant interiors. Ideal for families, couples, and groups seeking a world-class retreat.",
  Flats: "A sleek, fully-furnished modern flat in the heart of the city. Perfect for business travellers and urban explorers who want comfort without compromise.",
  Resorts: "Wake up to breathtaking views at this premium resort. Enjoy curated amenities, spa services, and locally-inspired cuisine — every detail is designed to relax and refresh.",
  Cabins: "Escape into nature at this enchanting cabin hideaway. Surrounded by trees and mountain air, it's the perfect antidote to city life — cosy, quiet, and unforgettable.",
};

const amenitiesByCategory = {
  Hotels: ["Free WiFi", "Room Service", "Daily Housekeeping", "Restaurant On-Site", "Gym", "Air Conditioning"],
  Villas: ["Private Pool", "Free WiFi", "Free Parking", "Breakfast Included", "Air Conditioning", "BBQ Grill"],
  Flats: ["Free WiFi", "Smart TV", "Fully Equipped Kitchen", "Washing Machine", "Air Conditioning", "City View"],
  Resorts: ["Spa & Wellness", "Restaurant On-Site", "Swimming Pool", "Free WiFi", "Room Service", "Gym"],
  Cabins: ["Mountain View", "Bonfire Area", "Free Parking", "Free WiFi", "Hiking Trails", "Hot Shower"],
};

const highlightsByCategory = {
  Hotels: [{ icon: "bed", label: "Premium Room" }, { icon: "users", label: "2 Guests" }, { icon: "bath", label: "1 Bathroom" }, { icon: "service", label: "24/7 Service" }],
  Villas: [{ icon: "bed", label: "3 Bedrooms" }, { icon: "users", label: "6 Guests" }, { icon: "bath", label: "2 Bathrooms" }, { icon: "pool", label: "Private Pool" }],
  Flats: [{ icon: "bed", label: "1 Bedroom" }, { icon: "users", label: "2 Guests" }, { icon: "bath", label: "1 Bathroom" }, { icon: "city", label: "City View" }],
  Resorts: [{ icon: "bed", label: "Suite Room" }, { icon: "users", label: "4 Guests" }, { icon: "bath", label: "2 Bathrooms" }, { icon: "ocean", label: "Ocean View" }],
  Cabins: [{ icon: "bed", label: "2 Bedrooms" }, { icon: "users", label: "4 Guests" }, { icon: "bath", label: "1 Bathroom" }, { icon: "mountain", label: "Mountain View" }],
};

const titles = ["Luxury Stay", "Modern Retreat", "Cozy Getaway", "Heritage Escape", "Panoramic View", "Nature Nest", "Grand Escape", "Serene Hideaway"];
const locations = ["Mumbai", "Delhi", "Goa", "Bangalore", "Hyderabad", "Jaipur", "Kerala", "Manali"];
const categories = ["Hotels", "Villas", "Flats", "Resorts", "Cabins"];
const prices = [3999, 4499, 4999, 5499, 5999, 6499, 6999, 7499, 7999, 8499, 8999, 3499];

const possibleNearbyAreas = [
  { name: "City Center", distance: "2.5 km" },
  { name: "Local Market", distance: "1.0 km" },
  { name: "Central Station", distance: "4.2 km" },
  { name: "Airport", distance: "12.5 km" },
  { name: "National Park", distance: "5.0 km" },
  { name: "Heritage Museum", distance: "3.2 km" },
  { name: "Beach / Lake", distance: "1.5 km" },
  { name: "Shopping Mall", distance: "2.8 km" }
];

const seedData = async () => {
  try {
    await connectDB();
    console.log('Clearing existing properties...');
    await Property.deleteMany();

    console.log('Setting up default Host user...');
    let hostUser = await User.findOne({ email: 'host@homely.com' });
    if (!hostUser) {
      hostUser = await User.create({ name: 'Homely Host', email: 'host@homely.com', password: 'Host@123', role: 'host', isVerified: true });
      console.log('Default host user created.');
    } else {
      console.log('Default host user already exists.');
    }

    console.log('Generating 40 properties with unique category images...');
    const newProperties = [];
    let idCounter = 0;

    for (const category of categories) {
      for (let i = 0; i < 8; i++) {
        const highlights = highlightsByCategory[category];
        const guestH = highlights.find(h => h.label.includes('Guests'));
        const maxGuests = guestH ? parseInt(guestH.label) || 2 : 2;
        const bedH = highlights.find(h => h.label.includes('Bedroom'));
        const bedrooms = bedH ? parseInt(bedH.label) || 1 : 1;
        const bathH = highlights.find(h => h.label.includes('Bathroom'));
        const bathrooms = bathH ? parseInt(bathH.label) : 1;

        newProperties.push({
          title: `${titles[i]} ${category.slice(0, -1)}`,
          category,
          location: { city: locations[i], country: 'India', address: `${titles[i]} Street, ${locations[i]}` },
          description: descriptions[category],
          price: prices[idCounter % prices.length],
          currency: 'INR',
          images: imagesByCategory[category][i],
          amenities: amenitiesByCategory[category],
          highlights,
          nearbyAreas: [
            possibleNearbyAreas[i % possibleNearbyAreas.length],
            possibleNearbyAreas[(i + 1) % possibleNearbyAreas.length],
            possibleNearbyAreas[(i + 2) % possibleNearbyAreas.length],
          ],
          host: hostUser._id,
          maxGuests,
          bedrooms,
          bathrooms,
          rating: parseFloat((4.0 + (Math.sin(idCounter + 1) * 0.4 + 0.5)).toFixed(1)),
          reviewCount: 20 + ((idCounter * 37 + 13) % 290),
          isNewlyListed: i < 2,
          isFeatured: idCounter % 3 === 0,
          isActive: true,
        });
        idCounter++;
      }
    }

    await Property.create(newProperties);
    console.log('✅ Successfully seeded 40 properties with rich unique images per category!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();
