/*
  # Populate Complete Timetable Data

  1. Clear existing data
  2. Insert all courses for L1, L2, and L3 (all options)
  3. Insert complete timetable entries with proper morning/afternoon classification
  
  Notes:
  - Morning sessions: 07h-10h, 10h-13h
  - Afternoon sessions: 13h-16h, 16h-19h
  - Reference date: 06/10/2025 is an afternoon week
*/

-- Clear existing data
TRUNCATE timetable CASCADE;
TRUNCATE courses CASCADE;

-- L1 SEMESTER 1 COURSES
INSERT INTO courses (code, name, teacher, hours, year_level, semester, option) VALUES
('1LNG 1162', 'Médias et société', NULL, 25, 'L1', 1, NULL),
('1LING 1164', 'Linguistique générale', 'Dr LIGAN', 55, 'L1', 1, NULL),
('1LNG 1165', 'Alphabets des langues Africaines', 'Dr YEBOU', 25, 'L1', 1, NULL),
('2LING 1164', 'Phonétique articulatoire', 'Prof SAMBIENI', 25, 'L1', 1, NULL),
('2LNG 1165', 'Questions d''orthographe', 'Dr KOSSOUHO', 15, 'L1', 1, NULL),
('1LNG 1161', 'Structure Générale des Langues', 'Dr FOLLY', 25, 'L1', 1, NULL),
('1LING 1167', 'Traitement des textes et gestion des polices des langues nationales', 'Prof ADJERAN', 10, 'L1', 1, NULL),
('2LNG 1161', 'Initiation aux Langues Africaines', 'Prof ADJERAN/SEMBIENI/LIGAN/ZIME-YERIMA/Dr FOLLY/AZEHOUNGBO', 25, 'L1', 1, NULL),
('1LNG 1163', 'Anglais', 'Dr ZIME YERIMA', 15, 'L1', 1, NULL),
('2LNG 1163', 'Autres langues étrangères/Russe', 'Dr YAÏ', 15, 'L1', 1, NULL),
('1LNG 1166', 'Techniques d''études des sources orales et Techniques d''enquêtes linguistiques', 'Dr FOLLY', 15, 'L1', 1, NULL),
('2LNG 1162', 'Théorie et méthode d''analyse en SIC', 'Dr AFFOGNON', 25, 'L1', 1, NULL);

-- L2 SEMESTER 3 COURSES
INSERT INTO courses (code, name, teacher, hours, year_level, semester, option) VALUES
('1LNG 1361', 'Phonologie', 'Prof SAMBIENI', 40, 'L2', 3, NULL),
('1LNG 1363', 'Littérature africaine', 'Dr ADJA E.', 15, 'L2', 3, NULL),
('2LNG 1365', 'Didactique des Langues', 'Dr LOUGBÉGNON', 15, 'L2', 3, NULL),
('1LNG 1365', 'Psychopédagogie', 'Dr OLOU', 15, 'L2', 3, NULL),
('2LNG 1363', 'TEEO', 'Dr HOUNZANGBE', 15, 'L2', 3, NULL),
('1LNG 1367', 'Méthodologie de recherche', 'Dr OLOU', 25, 'L2', 3, NULL),
('1LNG 1362', 'Sémiologie', 'Dr ZIME YERIMA', 15, 'L2', 3, NULL),
('2LNG 1364', 'Psycholinguistique', 'Dr OLOU', 15, 'L2', 3, NULL),
('1LNG 1364', 'Sociolinguistique et ethnolinguistique', 'Prof ADJERAN', 15, 'L2', 3, NULL),
('1 LNG 1366', 'Droit et déontologie des TIC/Législation et déontologie de l''information', 'Dr AHOUANDJINOU', 30, 'L2', 3, NULL),
('1LNG 1368', 'Traitement de textes et gestion des polices des langues nationales', 'Prof ADJERAN', 15, 'L2', 3, NULL),
('2LNG 1362', 'Sémantique et lexicologie', 'Dr FOLLY', 15, 'L2', 3, NULL);

-- L3 SEMESTER 5 COURSES - Description Linguistique
INSERT INTO courses (code, name, teacher, hours, year_level, semester, option) VALUES
('1 LNG 1563', 'Analyse Morphologique', 'Dr YEBOU', 25, 'L3', 5, 'Description Linguistique'),
('1 LNG 1562', 'Analyse phonologique', 'Dr KOSSOUHO', 25, 'L3', 5, 'Description Linguistique'),
('2 LNG 1562', 'Analyse tonologique', 'Prof SAMBIENI', 25, 'L3', 5, 'Description Linguistique'),
('2 LNG 1565', 'Linguistique historique et comparative', 'Dr KOSSOUHO', 10, 'L3', 5, 'Description Linguistique'),
('1 LNG 1561', 'Politique linguistique et statut des langues en Afrique et dans le monde', 'Dr KOSSOUHO', 40, 'L3', 5, 'Description Linguistique'),
('1 LNG 1566', 'Questions d''orthographique', 'Dr KOSSOUHO', 15, 'L3', 5, 'Description Linguistique'),
('1 LNG 1564', 'Langues et cultures béninoises', 'Prof SAMBIENI/Dr ADJERAN/Dr YEBOU/Dr LOUGBEGNON/Dr LIGAN/Dr ZIME YERIMA', 25, 'L3', 5, 'Description Linguistique'),
('1 LNG 1565', 'Linguistique typologique', 'Prof SAMBIENI', 10, 'L3', 5, 'Description Linguistique'),
('2 LNG 1566', 'Terminologie', 'Dr LIGAN', 10, 'L3', 5, 'Description Linguistique'),
('2 LNG 1564', 'Histoire de la Civilisation Française', 'Dr LOUGBEGNON', 25, 'L3', 5, 'Description Linguistique'),
('2 LNG 1563', 'Analyse Syntaxique', 'Dr BONOU-GBO', 25, 'L3', 5, 'Description Linguistique');

-- L3 SEMESTER 5 COURSES - Didactique des Langues
INSERT INTO courses (code, name, teacher, hours, year_level, semester, option) VALUES
('1 LNG 1562-DL', 'Cultures, Education des Adultes et Développement', 'Dr LIGAN', 25, 'L3', 5, 'Didactique des Langues et Cultures'),
('1 LNG 1561-DL', 'Politique linguistique et statut des langues en Afrique et dans le monde', 'Dr ADJA E.', 40, 'L3', 5, 'Didactique des Langues et Cultures'),
('1 LNG 1566-DL', 'Questions d''orthographique', 'Dr KOSSOUHO', 15, 'L3', 5, 'Didactique des Langues et Cultures'),
('1 LNG 1503', 'Langues et cultures béninoises', 'Prof SAMBIENI/Dr ADJERAN/Dr YEBOU/Dr LOUGBEGNON/Dr LIGAN/Dr ZIME YERIMA', 25, 'L3', 5, 'Didactique des Langues et Cultures'),
('1 LNG 1565-DL', 'Technique de Rédaction des mémoires', 'Dr LOUGBEGNON', 15, 'L3', 5, 'Didactique des Langues et Cultures'),
('2 LNG 1562-DL', 'Sémiotique du développement', 'Pr GBAGUIDI K. J.', 25, 'L3', 5, 'Didactique des Langues et Cultures'),
('1 LNG 1564-DL', 'Sémiologie', 'Dr ZIME YERIMA', 25, 'L3', 5, 'Didactique des Langues et Cultures'),
('2 LNG 1566-DL', 'Terminologie', 'Dr LIGAN', 10, 'L3', 5, 'Didactique des Langues et Cultures'),
('2 LNG 1563-DL', 'Histoire de la civilisation française', 'Dr LOUGBEGNON', 25, 'L3', 5, 'Didactique des Langues et Cultures'),
('2 LNG 1565-DL', 'Techniques d''Analyse Littéraire', 'Dr HOUNZANGBE', 10, 'L3', 5, 'Didactique des Langues et Cultures'),
('2 LNG 1564-DL', 'Stylistique et Rhétorique', 'Dr ADJA E.', 25, 'L3', 5, 'Didactique des Langues et Cultures');

-- Continue in next query...
