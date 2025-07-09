import { useState } from 'react'
import './App.css'
import { ChromaClient } from "chromadb";
import { useEffect } from 'react';
import { env } from "chromadb-default-embed";

env.useBrowserCache = false;
env.allowLocalModels = false;

const MockMovies = [
  {
    "title": "The Chronos Gambit",
    "tags": ["sci-fi", "thriller", "time travel", "mystery"],
    "synopsis": "In a not-so-distant future, where temporal displacement technology has been perfected but tightly controlled by a clandestine global organization known as 'The Chronos Keepers', Dr. Aris Thorne, a disgraced astrophysicist, stumbles upon a rogue time anomaly. This anomaly isn't just a ripple; it's a gaping wound in the fabric of spacetime, threatening to unravel the very concept of causality. Haunted by the disappearance of his daughter years ago, a tragedy he suspects is linked to the Keepers' secretive experiments, Thorne risks everything to exploit this anomaly. He builds a rudimentary, highly unstable temporal device, not to change the past, but to understand the 'Echoes' – fleeting, distorted visions of alternate timelines that bleed into his own. As he delves deeper, he uncovers a conspiracy far more intricate and sinister than he imagined, involving ancient prophecies, a hidden parallel dimension, and a powerful entity known only as 'The Architects', who manipulate time for their own enigmatic purposes. Thorne must race against time itself, navigating paradoxes and evading the Chronos Keepers, to prevent a cataclysmic temporal collapse that would erase all of existence, and perhaps, finally find answers about his daughter's fate."
  },
  {
    "title": "Aetheria: The Sky Weaver's Song",
    "tags": ["fantasy", "adventure", "magic", "mythology", "epic"],
    "synopsis": "In the vibrant, cloud-kissed realm of Aetheria, where cities float on colossal crystalline islands and the wind carries the whispers of forgotten gods, young Lyra discovers she possesses the rare and ancient gift of 'Sky Weaving'. This power allows her to manipulate the very currents of the aether, conjuring illusions, mending broken sky-bridges, and even communicating with the colossal, gentle air-whales that roam the upper atmosphere. However, her nascent abilities draw the attention of the tyrannical 'Storm King', a sorcerer who seeks to drain the aether for his own dark rituals, threatening to plunge Aetheria into an eternal tempest. Lyra, along with a cynical but skilled sky-pirate, a wise elder with secrets of her own, and a mischievous elemental sprite, embarks on a perilous journey across the floating archipelago. Their quest leads them to ancient sky temples, hidden cloud cities, and perilous wind-blasted peaks, seeking the legendary 'Heart of the Aether', a mythical artifact said to hold the key to restoring balance to their world and defeating the Storm King before Aetheria falls from the sky forever."
  },
  {
    "title": "The Echoing Silence",
    "tags": ["horror", "supernatural", "psychological", "haunted house"],
    "synopsis": "After the tragic loss of their young son, the estranged couple Sarah and Mark retreat to a remote, isolated Victorian manor inherited from a distant relative, hoping to find solace and perhaps mend their fractured relationship. The house, known locally as 'Blackwood Manor', has a chilling reputation, rumored to be a place where the veil between worlds is thin. Initially, the silence is a welcome balm, but soon, unsettling phenomena begin: faint whispers emanating from empty rooms, fleeting shadows in peripheral vision, and the disquieting sensation of being constantly watched. Sarah, prone to vivid nightmares and increasingly erratic behavior, believes their son's spirit is trying to communicate, while Mark, a staunch rationalist, dismisses it as grief-induced hallucination. As the days turn into weeks, the manifestations grow more aggressive and malevolent, revealing a dark history tied to the manor's previous inhabitants – a family consumed by madness and despair. The couple must confront not only the terrifying supernatural forces within Blackwood Manor but also their own spiraling grief and guilt, before the echoing silence of the house claims their sanity and their lives forever."
  },
  {
    "title": "Neon Bloom: The Bio-Hacker's Code",
    "tags": ["cyberpunk", "thriller", "dystopian", "action", "conspiracy"],
    "synopsis": "In the sprawling, perpetually rain-slicked metropolis of Neo-Kyoto, dominated by towering corporate skyscrapers and the oppressive glow of neon, Elara is a prodigy 'bio-hacker'. She specializes in illegally augmenting human capabilities through genetic manipulation and advanced neural implants, operating from the grimy underbelly of the city's black markets. When her younger sister falls gravely ill with a mysterious, rapidly deteriorating genetic disease, Elara discovers it's a side effect of a new, unregulated bio-ware produced by 'OmniCorp', the city's most powerful and ruthless biotechnology conglomerate. Driven by desperation, Elara infiltrates OmniCorp's impenetrable data-fortress, seeking a cure. What she uncovers is a horrifying truth: OmniCorp isn't just selling enhancements; they're subtly controlling the population through 'Bio-Symphony', a seemingly innocuous health network that secretly rewrites human DNA, turning citizens into unwitting, pliable drones. With the help of a jaded ex-corporate mercenary and a network of underground 'data-ghosts', Elara must expose OmniCorp's chilling conspiracy to the world, risking her life in high-stakes cyber-battles and exhilarating chases through the neon-drenched streets, before humanity's very essence is re-written."
  },
  {
    "title": "The Last Cartographer",
    "tags": ["fantasy", "exploration", "mystery", "quest", "post-apocalyptic"],
    "synopsis": "Centuries after 'The Great Sundering' shattered the world into a myriad of floating islands and perilous sky-chasms, humanity clings to existence, guided by the scattered, faded maps of an ancient civilization. Kaelen, the last remaining 'Cartographer', possesses the unique ability to perceive the faint, lingering echoes of the old world's ley lines – invisible pathways that once connected the landmasses. When a mysterious, sentient blight begins consuming the life force of the islands, threatening to plunge the remnants of civilization into oblivion, Kaelen discovers a cryptic, incomplete map fragment. This fragment hints at 'The Uncharted Heart', a mythical central landmass rumored to hold the key to healing the world. Joined by a gruff, sky-ship captain with a haunted past, a cynical but resourceful 'relic hunter', and a silent, enigmatic creature of the forgotten forests, Kaelen embarks on a perilous journey across treacherous skies and unknown territories. They face monstrous sky-beasts, ancient traps, and the skepticism of desperate communities, all while racing against the encroaching blight, hoping to re-map a broken world and uncover the secrets of its catastrophic past before it's too late."
  },
  {
    "title": "Subterranean Symphony",
    "tags": ["sci-fi", "horror", "exploration", "survival", "creature feature"],
    "synopsis": "In the year 2077, after a series of devastating seismic events render the Earth's surface largely uninhabitable, humanity retreats into vast, subterranean cities. Deep beneath the crust, 'Mega-City Alpha' thrives, relying on geothermal energy and advanced tunneling technology. When an unprecedented energy crisis strikes, a specialized team of deep-earth drillers is dispatched on a desperate mission to drill to the planet's core, seeking a mythical, inexhaustible energy source known as 'The Lumina Geode'. As their drilling rig descends into the unexplored depths, they encounter increasingly bizarre and hostile ecosystems, illuminated by strange bioluminescent flora and fauna. But the true horror lies even deeper: an ancient, highly intelligent, and ravenous species of subterranean creatures, long dormant, awakened by the drills' incessant vibrations. These creatures, blind but exquisitely sensitive to sound, hunt by echolocation, turning the mission into a terrifying game of cat and mouse in the claustrophobic darkness. The team must navigate crumbling caverns, evade the relentless pursuit of the 'Echo Predators', and decipher the true, terrifying nature of the Lumina Geode, which may not be a source of energy at all, but a monstrous, living organism, before they become just another note in the subterranean symphony of their own demise."
  },
  {
    "title": "The Whispering Labyrinth",
    "tags": ["fantasy", "mystery", "adventure", "puzzle", "enchanted forest"],
    "synopsis": "Deep within the cursed 'Gloaming Woods', a place where trees grow in impossible geometries and shadows hold sentient malice, lies the mythical 'Whispering Labyrinth'. Legends say it's a constantly shifting maze, guarded by ancient, ethereal beings, and that only those with a pure heart and an unyielding will can navigate its treacherous paths to reach 'The Heartwood', a legendary artifact said to grant ultimate knowledge. Elara, a young cartographer whose village is slowly being consumed by theaming Wood's malevolent influence, seeks the Heartwood to save her people. But she's not alone in her quest. A cynical rogue seeking forgotten treasures, a scholarly mage obsessed with forbidden lore, and a silent, shapeshifting guardian of the labyrinth's edge also enter its depths. The labyrinth itself is a living entity, whispering illusions, twisting pathways, and conjuring phantoms of their deepest fears. They must solve ancient riddles, overcome magical traps, and confront their own personal demons as the labyrinth attempts to break their spirit and consume them entirely. As they delve deeper, the line between reality and illusion blurs, and they uncover a shocking truth about the labyrinth's true purpose and the very nature of knowledge itself."
  },
  {
    "title": "Solar Flare: An Orbital Escape",
    "tags": ["sci-fi", "action", "survival", "space opera", "disaster"],
    "synopsis": "In the year 2342, humanity lives aboard a vast network of orbital stations orbiting a dying sun. Life is meticulously regulated by the omnipresent 'Stellar Directorate', which promises safety and prosperity. Captain Eva Rostova, a jaded freight pilot with a checkered past, finds her routine existence shattered when an unprecedented and catastrophic solar flare, far exceeding all predictions, erupts from the sun. The flare, nicknamed 'The Great Scorch', devastates most of the orbital infrastructure, plunging humanity into chaos. Eva, along with her mismatched crew – a brilliant but socially awkward engineer, a stoic former military operative, and a precocious young stowaway – finds herself stranded on a crippled cargo vessel, drifting towards the sun's lethal embrace. Their only hope of survival lies in reaching the legendary 'Ark Station', a self-sustaining deep-space habitat rumored to be the last bastion of humanity, but its location is a closely guarded secret of the Directorate. They must navigate debris fields, evade desperate raiders, outsmart rogue AI, and battle against the relentless march of the dying sun, all while uncovering a shocking conspiracy about the Directorate's true intentions and the nature of the Ark Station, in a desperate race against time and the fiery demise of their solar system."
  },
  {
    "title": "The Automaton's Lament",
    "tags": ["steampunk", "mystery", "noir", "thriller", "artificial intelligence"],
    "synopsis": "In the gaslit, perpetually fog-shrouded metropolis of Aethelburg, a city powered by intricate clockwork and steam, Inspector Alistair Finch is a disillusioned detective haunted by the disappearance of his family. He's assigned a perplexing case: the murder of a prominent inventor, found dismembered in his workshop, surrounded by his intricate, seemingly sentient automatons. The prime suspect is a highly advanced, human-like automaton known as 'Unit 734', which has vanished. As Finch delves into the grimy underbelly of Aethelburg's industrial revolution, he uncovers a conspiracy involving secret societies, illicit aether-powered technologies, and the burgeoning sentience of the city's mechanical populace. He finds an unlikely ally in a cynical, decommissioned automaton named 'Cogsworth', who possesses a surprising depth of understanding and a dry wit. Together, they navigate the treacherous alleys, hidden laboratories, and opulent airship docks of Aethelburg, facing off against ruthless industrial magnates, fanatical Luddites, and the terrifying implications of artificial life. Finch must not only solve the murder but also confront his own prejudices about sentience and humanity, as the Automaton's Lament, a mournful song whispered through the city's gears, hints at a revolution far grander and more perilous than anyone imagined."
  },
  {
    "title": "Crimson Bloom: The Vampire's Gardens",
    "tags": ["supernatural", "romance", "gothic", "mystery", "urban fantasy"],
    "synopsis": "In the hidden corners of modern-day Prague, where ancient cobblestone streets give way to shadowy courtyards, Elara, a botanist with an unusual affinity for rare and night-blooming flowers, stumbles upon 'The Crimson Gardens'. These are not ordinary gardens; they are a labyrinthine sanctuary of otherworldly flora, tended by a reclusive and enigmatic man named Lucien. Lucien is, unbeknownst to Elara, an ancient vampire, the last of his noble line, who feeds not on blood, but on the residual life force of these enchanted plants, which he cultivates with meticulous care. Drawn to the gardens' intoxicating beauty and Lucien's quiet intensity, Elara begins to unravel the mysteries of this secret world. But their burgeoning connection is threatened by a rival coven of aggressive, traditionalist vampires who seek to seize the Crimson Gardens and exploit their unique power for their own dark purposes, believing the plants are a gateway to untold strength. Elara finds herself embroiled in a dangerous, centuries-old conflict, forced to confront the supernatural truths she once scoffed at. She must navigate a world of ancient pacts, forbidden magic, and treacherous alliances, all while grappling with her growing feelings for Lucien and the moral complexities of his existence, in a fight to protect not only the gardens but also the fragile, beautiful bond that blossoms between them."
  }
];

function MovieTag({ tag }){
  return <div style={{border: "1px solid grey", padding: 5, fontSize: 12, borderRadius: 7}}>{tag}</div>
}

function MovieCard({ title, tags, synopsis }){
  return <div className="movie-card" style={{display: "flex", flexDirection: "column", gap: 5, border: "1px solid grey", borderRadius: 10, padding: "10px", height: "250px"}}>
    <h2 style={{margin: 0}}>{title}</h2>
    <div style={{display: "flex", justifyContent: "center", gap: 5}}>{tags.map((t, idx) => <Movietag key={idx} tag={t}/>)}</div>
    <div style={{overflow: "auto", padding: 5}}>{synopsis}</div>
  </div>
}

function App() {
  const [chromaCollection, setChromaCollection] = useState(null);

  async function queryDatabase(){
    console.log(await chromaCollection.query({queryTexts: "a movie about space"});)
  }

  useEffect(() => {

    const initializeChroma = async () => {
      const chromaClient = new ChromaClient();
      const collection = await chromaClient.getOrCreateCollection({name: "movies"});

      setChromaCollection(collection);
    }
    
    initializeChroma();
  }, []);

  return (
    <>
      <h1>Movie Recommender</h1>
      <div style={{display: "flex", flexDirection: "column"}}>
        <textarea></textarea>
        <button onClick={queryDatabase}>Submit</button>
      </div>
      <div className="movie-list" style={{marginTop: "15px", display: "flex", flexDirection: "column", gap: 5}}>
        {MockMovies.map((m, idx) => <MovieCard key={idx} {...m} />)}
      </div>

    </>
  )
}

export default App
