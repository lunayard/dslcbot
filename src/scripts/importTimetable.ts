import { supabase } from '../lib/supabase';

const l1Data = [
  { jour: "Lundi", horaire: "10h-13h", code_ue: "1LNG 1162", intitule: "Médias et société", heures: "25h", enseignant: null },
  { jour: "Lundi", horaire: "13h-16h", code_ue: "1LING 1164", intitule: "Linguistique générale", heures: "55h", enseignant: "Dr LIGAN" },
  { jour: "Lundi", horaire: "16h-19h", code_ue: "1LNG 1165", intitule: "Alphabets des langues Africaines", heures: "25h", enseignant: "Dr YEBOU" },
  { jour: "Mardi", horaire: "10h-13h", code_ue: "2LING 1164", intitule: "Phonétique articulatoire", heures: "25h", enseignant: "Prof SAMBIENI" },
  { jour: "Mardi", horaire: "13h-16h", code_ue: "2LNG 1165", intitule: "Questions d'orthographe", heures: "15h", enseignant: "Dr KOSSOUHO" },
  { jour: "Mardi", horaire: "16h-19h", code_ue: "2LING 1164", intitule: "Phonétique articulatoire", heures: "25h", enseignant: "Prof SAMBIENI" },
  { jour: "Mercredi", horaire: "10h-13h", code_ue: "1LNG 1161", intitule: "Structure Générale des Langues", heures: "25h", enseignant: "Dr FOLLY" },
  { jour: "Mercredi", horaire: "13h-16h", code_ue: "1LING 1167", intitule: "Traitement des textes et gestion des polices des langues nationales", heures: "10h", enseignant: "Prof ADJERAN" },
  { jour: "Mercredi", horaire: "16h-19h", code_ue: "1LNG 1161", intitule: "Structure Générale des Langues", heures: "25h", enseignant: "Dr FOLLY" },
  { jour: "Jeudi", horaire: "7h-10h", code_ue: "2LNG 1161", intitule: "Initiation aux Langues Africaines", heures: "25h", enseignant: "Prof ADJERAN/SEMBIENI/LIGAN/ZIME-YERIMA/Dr FOLLY/AZEHOUNGBO" },
  { jour: "Jeudi", horaire: "10h-13h", code_ue: "1LNG 1163", intitule: "Anglais", heures: "15h", enseignant: "Dr ZIME YERIMA" },
  { jour: "Jeudi", horaire: "13h-16h", code_ue: "2LNG 1163", intitule: "Autres langues étrangères/Russe", heures: "15h", enseignant: "Dr YAÏ" },
  { jour: "Jeudi", horaire: "16h-19h", code_ue: "1LNG 1163", intitule: "Anglais", heures: "15h", enseignant: "Dr ZIME YERIMA" },
  { jour: "Vendredi", horaire: "10h-13h", code_ue: "1LNG 1166", intitule: "Techniques d'études des sources orales et Techniques d'enquêtes linguistiques", heures: "15h", enseignant: "Dr FOLLY" },
  { jour: "Vendredi", horaire: "13h-16h", code_ue: "2LNG 1162", intitule: "Théorie et méthode d'analyse en SIC", heures: "25h", enseignant: "Dr AFFOGNON" },
  { jour: "Vendredi", horaire: "16h-19h", code_ue: "1LNG 1166", intitule: "Techniques d'études des sources orales et Techniques d'enquêtes linguistiques", heures: "15h", enseignant: "Dr FOLLY" }
];

const l2Data = [
  { jour: "Lundi", horaire: "07H-10H", code_ue: "2LNG 1365", intitule: "Didactique des Langues", heures: "15h", enseignant: "Dr LOUGBÉGNON" },
  { jour: "Lundi", horaire: "10H-13H", code_ue: "1LNG 1361", intitule: "Phonologie", heures: "40h", enseignant: "Prof SAMBIENI" },
  { jour: "Lundi", horaire: "13H-16H", code_ue: "1LNG 1363", intitule: "Littérature africaine", heures: "15h", enseignant: "Dr ADJA E." },
  { jour: "Mardi", horaire: "10H-13H", code_ue: "1LNG 1365", intitule: "Psychopédagogie", heures: "15h", enseignant: "Dr OLOU" },
  { jour: "Mardi", horaire: "13H-16H", code_ue: "1LNG 1362", intitule: "Sémiologie", heures: "15h", enseignant: "Dr ZIME YERIMA" },
  { jour: "Mercredi", horaire: "07H-10H", code_ue: "2LNG 1363", intitule: "TEEO", heures: "15h", enseignant: "Dr HOUNZANGBE" },
  { jour: "Mercredi", horaire: "10H-13H", code_ue: "1LNG 1367", intitule: "Méthodologie de recherche", heures: "25h", enseignant: "Dr OLOU" },
  { jour: "Jeudi", horaire: "07H-10H", code_ue: "2LNG 1364", intitule: "Psycholinguistique", heures: "15h", enseignant: "Dr OLOU" },
  { jour: "Jeudi", horaire: "10H-13H", code_ue: "1LNG 1364", intitule: "Sociolinguistique et ethnolinguistique", heures: "15h", enseignant: "Prof ADJERAN" },
  { jour: "Jeudi", horaire: "13H-16H", code_ue: "1 LNG 1366", intitule: "Droit et déontologie des TIC/Législation et déontologie de l'information", heures: "30h", enseignant: "Dr AHOUANDJINOU/...." },
  { jour: "Vendredi", horaire: "07H-10H", code_ue: "1LNG 1368", intitule: "Traitement de textes et gestion des polices des langues nationales", heures: "15h", enseignant: "Prof ADJERAN" },
  { jour: "Vendredi", horaire: "10H-13H", code_ue: "2LNG 1362", intitule: "Sémantique et lexicologie", heures: "15h", enseignant: "Dr FOLLY" }
];

async function importData() {
  console.log('Starting import...');

  for (const entry of l1Data) {
    const hours = parseInt(entry.heures);

    let { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('code', entry.code_ue)
      .eq('year_level', 'L1')
      .maybeSingle();

    if (!course) {
      const { data: newCourse } = await supabase
        .from('courses')
        .insert({
          code: entry.code_ue,
          name: entry.intitule,
          teacher: entry.enseignant,
          hours,
          year_level: 'L1',
          semester: 1
        })
        .select('id')
        .single();
      course = newCourse;
    }

    if (course) {
      const weekType = entry.horaire.startsWith('7h') || entry.horaire.startsWith('07h') ? 'morning' : 'afternoon';

      await supabase.from('timetable').insert({
        course_id: course.id,
        day: entry.jour,
        start_time: entry.horaire.toLowerCase().replace('h-', 'h-'),
        end_time: '',
        week_type: weekType,
        year_level: 'L1',
        semester: 1
      });
    }
  }

  console.log('L1 imported');

  for (const entry of l2Data) {
    const hours = parseInt(entry.heures);

    let { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('code', entry.code_ue)
      .eq('year_level', 'L2')
      .maybeSingle();

    if (!course) {
      const { data: newCourse } = await supabase
        .from('courses')
        .insert({
          code: entry.code_ue,
          name: entry.intitule,
          teacher: entry.enseignant,
          hours,
          year_level: 'L2',
          semester: 3
        })
        .select('id')
        .single();
      course = newCourse;
    }

    if (course) {
      const weekType = entry.horaire.startsWith('07') ? 'morning' : 'afternoon';

      await supabase.from('timetable').insert({
        course_id: course.id,
        day: entry.jour,
        start_time: entry.horaire.toLowerCase(),
        end_time: '',
        week_type: weekType,
        year_level: 'L2',
        semester: 3
      });
    }
  }

  console.log('L2 imported');
  console.log('Import complete!');
}

export { importData };
