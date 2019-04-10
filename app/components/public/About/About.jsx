import React from 'react';
let {Component} = React;
//import styles from './About.css';
import { Row, Col } from 'react-bootstrap';
import './About.css';
import AboutText from '../../../../config/markdown/about.md';
import group from './group.jpg';
import group2019 from './group2019.jpg';
export default class About extends Component {
    render() {
        return (
            <div className="about-container">

                <Row> 
                    <h1 className="about-title">2019 Team</h1>     
                    <Col md={3} mdOffset={2}>
                        <img src={group2019} className="group-photo" />
                    </Col>
                    <Col md={5}>
                        <div className="about-description" dangerouslySetInnerHTML={{ __html: AboutText}} />
                        <h1 className="about-title">Contributors</h1>
                        <Row>
                            <Col mdOffset={1} md={5}>
                                <h3>Mentors</h3>
                                <TeamMemberListing teamID="2019Mentor"/>
                                <h3>Database &amp; API</h3>
                                <TeamMemberListing teamID="2019A"/>
                                <h3>Data Analysis</h3>
                                <TeamMemberListing teamID="2019B"/>
                                <TeamMemberListing teamID="2019C"/>
                            </Col>
                            <Col md={5}>
                                <h3>Integration &&nbsp;Frontend</h3>
                                <TeamMemberListing teamID="2019D"/>
                            </Col> 
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <h1 className="about-title">The original 2016 Team</h1>
                    <Col md={3} mdOffset={2}>
                        <img src={group} className="group-photo" />
                    </Col>
                    <Col md={5}>
                        <div className="about-description" >This web app is the result of the seminars Javascript technology 
                        2019 and 2016 at the Technical University of Munich. The original team developed the first version in
                         to predict the likelihood of death for characters in season 6. </div>
                        <h1 className="about-title">Contributors</h1>
                       <Row>
                            <Col mdOffset={1} md={5}>
                                <h3>Mentors</h3>
                                <TeamMemberListing teamID="Mentor"/>
                                <h3>Database &amp; API</h3>
                                <TeamMemberListing teamID="A"/>
                                <h3>Data Analysis</h3>
                                <TeamMemberListing teamID="B"/>
                                <TeamMemberListing teamID="D"/>
                            </Col>
                            <Col md={5}>
                                <h3>Frontend &amp; Design</h3>
                                <TeamMemberListing teamID="F"/>
                                <h3>Map</h3>
                                <TeamMemberListing teamID="C"/>
                                <h3>Integration</h3>
                                <TeamMemberListing teamID="E"/>
                                <h3>Support</h3>
                                <TeamMemberListing teamID="S"/>
                                <h3>Media Contact</h3>
                                <TeamMemberListing teamID="T"/>
                            </Col>
                                                     
                            
                        </Row>

                    </Col>
                </Row>

                <br />

                <Row>
                    <Col md={8} mdOffset={2}>
                        <h1 className="about-title">Attributions</h1>
                        <p className="about-description">Most of our data was - and is periodically- scraped from <a href="http://awoiaf.westeros.org" target="_blank">A Wiki of Ice and Fire</a> and <a href="http://gameofthrones.fandom.com" target="_blank">Fandom Game of Thrones Wiki</a>. Contributing to these wikis will enhance this portal greatly, so make sure you drop a visit to our wiki-partners and request an account.</p>
                        <p className="about-description">We used the sources and licenses listed on <a href="/attributions">this page</a>.</p>
                        <p className="about-description">We would like to thank Microsoft for their support through providing the JavaScript seminar with the Microsoft Education Grant, which allowed us to test and develop the software presented on this webpage, as well as numerous other projects related to classes taught at the chair of Bioinformatics at TUM. We would also like to thank GiHub for providing a platform for us to share and test our code.</p>
                    </Col>
                </Row>

                <br />

            </div>
        );
    }
}



class TeamMemberListing extends Component {
    render() {
        return(
            <div>
                {
                    this.getProjectMembers(this.props.teamID).map(function (member) {
                        return <TeamMember key={member.name} data={member}/>;})
                }
            </div>
        );
    }
    getProjectMembers(projectID) {
        return [
            {
                name: "Georgi Anastasov",
                link: "https://www.linkedin.com/in/georgi-anastasov-65124b11a",
                team: "F"
            },
            {
                name: "Max Muth",
                link: "http://www.maxi-muth.de",
                team: "F"
            },
            {
                name: "Florian Gareis",
                link: "https://www.florian-gareis.com",
                img:  "http://gravatar.com/avatar/9c8cef19ae44af5e2ed64addfe701a77",
                team: "E"
            },
            {
                name: "Guy Yachdav",
                link: "https://www.linkedin.com/in/gyachdav",
                team: "Mentor"
            },
            {
                name: "Christian Dallago",
                link: "http://dallago.us",
                img:  "https://c2.staticflickr.com/2/1481/25418571675_2dbacb53a7_q.jpg",
                team: "Mentor"
            },
            {
                name: "Kordian Bruck",
                link: "https://bruck.me",
                team: "A"
            },
            {
                name: "Julien Schmidt",
                link: "https://github.com/julienschmidt",
                team: "D"
            },
            {
                name: "Jonas Kaltenbach",
                link : "https://github.com/kajo404",
                team : "D"
            },
            {
                name: "Marcus Novotny",
                link : "https://github.com/marcusnovotny",
                team : "D"
            },
            {
                name: "Michael Legenc",
                link : "http://michael.legenc.de",
                team : "A"
            },
            {
                name : "Georg Gar",
                link : "https://github.com/Hack3l",
                team : "B"
            },
            {
                name: "Alexander Beischl",
                link: "https://github.com/AlexBeischl",
                team: "C"
            },
            {
                name: "Maximilian Bandle",
                link: "https://github.com/mbandle",
                team: "C"
            },
            {
                name: "Tobias Piffrader",
                link: "https://github.com/tPiffrader",
                team: "C"
            },
            {
                name: "Yasar Kücükkaya",
                link: "https://de.linkedin.com/in/yasar-kücükkaya-9718bb107",
                team: "F"
            },
            {
                name: "Camille Mainz",
                link : "https://github.com/Logarythms",
                team : "D"
            },
            {
                name: "Oleksii Moroz",
                link: "https://github.com/AlexMoroz",
                team: "E"
            },
            {
                name : "Subburam Rajaram",
                link : "https://github.com/subburamr",
                team : "B"
            },
            {
                name: "Anna Sesselmann",
                link: "https://github.com/asesselmann",
                team: "B"
            },
            {
                name: "Santanu Mohanta",
                link: "https://github.com/santanumohanta",
                team: "D"
            },
            {
                name: "Sohel Mahmud",
                link: "https://github.com/docjag",
                team: "A"
            },
            {
                name: "Cavid Salahov",
                link: "https://github.com/CavidSalahov",
                team: "E"
            },
            {
                name: "Nicola De Socio",
                link: "https://github.com/nicoladesocio",
                team: "B"},
            {
                name: "Thuy Tran",
                link: "https://github.com/ThuyNganTran",
                team: "B"
            },
            {
                name: "Tatyana Goldberg",
                link: "https://rostlab.org/~goldberg/",
                team: "Mentor"
            },
            {
                name: "Dmitrii Nechaev",
                link: "https://github.com/dmitry-n",
                team: "Mentor"
            },
            {
                name: "Jonas Ebel",
                link: "https://github.com/jonny3576",
                team: "E"
            },
            {
                name:"Dat Nguyen",
                link:"https://github.com/vanp33",
                team:"D"
            },
            {
                name: "Togi Dashnyam",
                link: "https://github.com/togiberlin",
                team: "A"
            },
            {
                name: "Theodor Cheslerean Boghiu",
                link: "https://de.linkedin.com/in/theodor-cheslerean-boghiu-234511102",
                team: "A"
            },
            {
                name: "Mina Zaki",
                link: "https://github.com/mina-zaki",
                team: "F"
            },
            {
                name: "Boris Idesman",
                link: "https://github.com/boriside",
                team: "A"
            },
            {
                name: "Boris Idesman",
                link: "https://github.com/boriside",
                team: "A"
            },
            {
                name: "Konstantinos Angelopoulos",
                link: "https://github.com/konstantinos-angelo",
                team: "B"
            },
            {
                name: "Emiliyana Kalinova",
                link: "https://github.com/Emiliyana",
                team: "E"
            },
            {
                name: "Burkhard Rost",
                link: "https://rost.org",
                team: "S"
            },
            {
                name: "Tim Karl",
                link: "https://www.rostlab.org/group/people/lab-members",
                team: "S"
            },
            {
                name: "Lothar Richter",
                link: "https://www.rostlab.org/group/people/lab-members",
                team: "S"
            },
            {
                name: "Emiliyana Kalinova",
                link: "https://github.com/Emiliyana",
                team: "E"
            },
            {
                name: "Ange Laure Temzeung Kouemo",
                link: "https://github.com/AngeKouemo",
                team: "E"
            },
            {
                name: "Andreas Battenberg",
                link: "",
                team: "T"
            },
            {
                name: "Ashmin Bhattarai",
                link: "",
                team: "2019A"
            },
            {
                name: "David Schemm",
                link: "",
                team: "2019A"
            },
            {
                name: "Gerald Mahlknecht",
                link: "",
                team: "2019A"
            },
            {
                name: "Daniel Homola",
                link: "",
                team: "2019A"
            },
            {
                name: "Julian Nalenz",
                link: "",
                team: "2019B"
            },
            {
                name: "Valentin Dimov",
                link: "",
                team: "2019B"
            },
            {
                name: "Robert Dillitz",
                link: "",
                team: "2019B"
            },
            {
                name: "Lukas Franke",
                link : "",
                team : "2019C"
            },
            {
                name: "Robin Brase",
                link : "",
                team : "2019C"
            },
            {
                name: "Rainier Klopper",
                link : "",
                team : "2019C"
            },
            {
                name : "Taylor Lei",
                link : "",
                team : "2019D"
            },
            {
                name: "Jan Schweizer",
                link: "",
                team: "2019D"
            },
            {
                name: "Boning Li",
                link: "",
                team: "2019D"
            },
            {
                name: "Florian Donhauser",
                link: "",
                team: "2019D"
            },
            {
                name: "Guy Yachdav",
                link: "https://www.linkedin.com/in/gyachdav",
                team: "2019Mentor"
            },
            {
                name: "Christian Dallago",
                link: "http://dallago.us",
                img:  "https://c2.staticflickr.com/2/1481/25418571675_2dbacb53a7_q.jpg",
                team: "2019Mentor"
            }
        ].filter((member) => {
                return projectID==member.team;
        });
    }
}
TeamMemberListing.propTypes = { teamID: React.PropTypes.string };

class TeamMember extends Component {
    render() {
        if (this.props.data.link) {
            return (<p><a target="_blank" href={this.props.data.link}>{this.props.data.name}</a></p>);
        } else {
            return (<p>{this.props.data.name}</p>);
        }
    }
}
TeamMember.propTypes =  {  data: React.PropTypes.object.isRequired };
