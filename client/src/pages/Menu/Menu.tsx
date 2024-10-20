import React, { useState, useMemo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Central as Layout } from "@/layouts";
import './Menu.style.scss';

type MenuItem = ReactNode;

interface Section {
  title: string;
  items: MenuItem[];
}

const Menu: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  const sections: Section[] = [
    {
      title: "GIVE ME ALL YOUR PERSONAL INFORMATION 🔫",
      items: [
        <Link to="/404">
          <b>Self Identification Survey</b>
        </Link>,
        <Link to="/404">Update addresses and phone numbers</Link>,
        <Link to="/404">View name change information</Link>,
        <Link to="/404">Personal Emergency Contact Information</Link>,
        <span>
          <b>Campus Card:</b> The CampusCard online services can now be
          accessed through the{" "}
          <a href="https://wcc.carleton.ca/student/welcome.php">
            CampusCard Web Center
          </a>
        </span>,
        <Link to="/404">
          MyCarletonOne Account information and Carleton Email address
        </Link>,
        <Link to="/404">Travel Registry</Link>,
        <Link to="/404">Manage Email Communications</Link>,
        <Link to="/404">Chosen Name</Link>,
        <Link to="/404">Pronouns</Link>,
        <Link to="/404">Submit Social Insurance Number (SIN)</Link>,
      ]
    },
    {
      title: "CHATGPT?? TO THE DEAN!!! 😡😡😡",
      items: [
        <span>
          <b>Graduate Admissions:</b> Graduate Admissions and Graduate In-
          Program Revisions.
        </span>,
        <Link to="/404">
          <b>Admissions</b> Review admission application, View Holds and
          Conditions of Offer, Internal Application for Admission
        </Link>,
        <Link to="/404">
          <b>myGrades</b> Display grades
        </Link>,
        <Link to="/404">
          <b>myProgress (ACE: Academic Continuation Evaluation)</b>
        </Link>,
        <Link to="/404">
          <b>myExam Schedule</b>
        </Link>,
        <Link to="/404">
          <b>myTransferCredit (credit from previous studies)</b>
        </Link>,
      ]
    },
    {
      title: "TOUR DATES AND GIVE ME YOUR MONEY 🤑",
      items: [
        <span>
          <b>Registration: </b>
          <Link to="/404">Getting Started</Link>,{" "}
          <Link to="/timetables/build">
            Build Your Timetable/Registration
          </Link>
          ,<Link to="/timetables">Student Timetables</Link>,
          <Link to="/404">Display Holds</Link>,
          <Link to="/404">Registration Override Requests</Link>
        </span>,
        <span>
          Other:
          <Link to="/404">Add/Drop Classes</Link>,
          <Link to="/404">French Placement Test</Link>,
          <Link to="/404">Purchase Books</Link>,
        </span>,
        <span>
          <Link to="/404">
            <b>Student Accounts: </b>
          </Link>
          ,<Link to="/404">Calculate Amount To Pay</Link>,
          <Link to="/404">International Currency Payment </Link>,
          <Link to="/404">Refund Request</Link>,
          <Link to="/404">Print tax receipts (T2202, RL-8)</Link>,
        </span>,
      ]
    },
    {
      title: "VICTOR LI FAN MEET UP 🧍🧍",
      items: [
        <span>
          <b>myAudit:</b> View academic audit.
        </span>,
        <Link to="/404">
          <b>myProgress:</b> ACE (Academic Continuation Evaluation).
        </Link>,
      ]
    },
    {
      title: "FAN MAIL UWU 💌💌",
      items: [
        <span>
          <b>Student Award Information:</b>
          Display all awards and/or funding (Student loans, bursaries,
          scholarships, graduate funding) and their status.
        </span>,
        <span>
          <Link to="/404">
            <b>Undergraduate Online Application Forms:</b>
          </Link>{" "}
          Apply for undergraduate bursaries/awards and Work Study programs.
          Check application status.
        </span>,
        <span>
          <Link to="/404">
            <b>Graduate Online Application Forms:</b>
          </Link>{" "}
          Apply for graduate bursaries/awards and other financial aid. Check
          application status,
        </span>,
        <span>
          <Link to="/404">
            <b>Thank You Messages:</b>
          </Link>{" "}
          Submit thank you messages for donor-funded awards.
        </span>,
      ]
    }
  ];

  const searchInItem = (item: MenuItem, term: string): boolean => {
    if (React.isValidElement(item)) {
      const childrenText = item.props.children;
      if (typeof childrenText === 'string') {
        return childrenText.toLowerCase().includes(term);
      } else if (Array.isArray(childrenText)) {
        return childrenText.some(child => 
          typeof child === 'string' && child.toLowerCase().includes(term)
        );
      }
    }
    return false;
  };

  const sectionsWithMatches = useMemo(() => {
    if (!searchTerm) return new Set<string>();
    
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const matchingSections = new Set<string>();

    sections.forEach(section => {
      if (section.title.toLowerCase().includes(lowercaseSearchTerm) ||
          section.items.some(item => searchInItem(item, lowercaseSearchTerm))) {
        matchingSections.add(section.title);
      }
    });

    return matchingSections;
  }, [sections, searchTerm]);

  const renderSection = (section: Section) => {
    const hasMatch = sectionsWithMatches.has(section.title);
    return (
      <div className={`cabinet-section ${hasMatch ? 'has-match' : ''}`} key={section.title}>
        <button 
          className={`accordion-trigger ${openSection === section.title ? 'open' : ''} ${hasMatch ? 'match' : ''}`} 
          onClick={() => toggleSection(section.title)}
        >
          {section.title}
          <span className="accordion-icon">{openSection === section.title ? '▲' : '▼'}</span>
        </button>
        <div className={`accordion-content ${openSection === section.title ? 'open' : ''}`}>
          <div className="cabinet-section__content">
            <div className="cabinet-section__image-container"></div>
            <ul className="cabinet-section__items">
              {section.items.map((item, index) => (
                <li key={index} className="menu-section__item">
                  {searchTerm && searchInItem(item, searchTerm.toLowerCase()) ? (
                    <span className="highlight">{item}</span>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Victor Li's Home">
      <div className="main-menu">
        <h1 className="main-menu__title">Victor Li's Home</h1>
        <div className="main-menu__search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="main-menu__search-input"
          />
        </div>
        <div className="main-menu__content">
          {sections.map(section => renderSection(section))}
        </div>
      </div>
    </Layout>
  );
}

export default Menu;