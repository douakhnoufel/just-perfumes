import { MapPin, Clock, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="stack-page">
      <div className="section-heading">
        <div className="eyebrow">Visit us</div>
        <h1>Our Store</h1>
        <p>
          Experience our collection of authentic extrait de parfum in person.
          Our experts will help you find your signature scent.
        </p>
      </div>

      <div className="contact-grid">
        <div className="panel-card contact-info">
          <h2>JUST-PERFUM</h2>
          <div className="contact-details">
            <div className="contact-item">
              <MapPin size={20} />
              <div>
                <strong>Location</strong>
                <p>Algeria</p>
              </div>
            </div>
            <div className="contact-item">
              <Clock size={20} />
              <div>
                <strong>Hours</strong>
                <p>Open daily</p>
              </div>
            </div>
            <div className="contact-item">
              <Phone size={20} />
              <div>
                <strong>Contact</strong>
                <p>Visit us in store</p>
              </div>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/4op56WDqWCRzqWdY6"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-link"
          >
            <MapPin size={18} />
            Get directions
          </a>
        </div>

        <div className="panel-card map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d406.0741!2d2.7551272!3d36.2641351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128f6b7cdb576949%3A0x6618c6fd5c67300c!2sJustparfum!5e0!3m2!1sfr!2sdz!4v1710000000000!5m2!1sfr!2sdz"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: 16, minHeight: 300 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="JUST-PERFUM Store Location"
          />
        </div>
      </div>
    </section>
  );
}
