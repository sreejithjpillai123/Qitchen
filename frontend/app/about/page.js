import styles from './about.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            {/* Left Side: Hero Image */}
            <div className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.pageTitle}>About</div>
            </div>

            {/* Right Side: Content (Bento Grid) */}
            <div className={styles.aboutContent}>

                {/* Row 1: Intro Text + Interior Image */}
                <div className={styles.rowSplit}>
                    {/* Text Card */}
                    <div className={styles.card}>
                        <div className={styles.textCardContent}>
                            <h2 className={styles.mainTitle}>Sushi Artistry <br /> Redefined</h2>
                            <p className={styles.description}>
                                Where culinary craftsmanship meets modern elegance, indulge in the finest sushi, expertly curated to elevate your dining experience.
                            </p>
                        </div>
                    </div>
                    {/* Image Card */}
                    <div className={styles.card}>
                        <img src="/images/about2.png" alt="Interior" className={styles.coverImage} />
                    </div>
                </div>

                {/* Row 2: Awards */}
                <div className={styles.awardsRow}>
                    <div className={styles.card}>
                        <div className={styles.awardCardContent}>
                            <div className={styles.stars}>★ ★ ★ ★ ★</div>
                            <h3 className={styles.awardTitle}>Trip Advisor</h3>
                            <p className={styles.awardSubtitle}>BEST STEAK HOUSE<br />PRAGUE</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.awardCardContent}>
                            <div className={styles.stars}>★ ★ ★ ★ ★</div>
                            <h3 className={styles.awardTitle}>Michelin Guide</h3>
                            <p className={styles.awardSubtitle}>BEST STEAK HOUSE<br />PRAGUE</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.awardCardContent}>
                            <div className={styles.stars}>★ ★ ★ ★ ★</div>
                            <h3 className={styles.awardTitle}>Star Dining</h3>
                            <p className={styles.awardSubtitle}>BEST STEAK HOUSE<br />PRAGUE</p>
                        </div>
                    </div>
                </div>

                {/* Row 3: Chef Image + Story Text */}
                <div className={styles.rowSplit}>
                    {/* Image Card */}
                    <div className={styles.card}>
                        <img src="/images/about3.png" alt="Chefs" className={styles.coverImage} />
                    </div>
                    {/* Text Card */}
                    <div className={styles.card}>
                        <div className={styles.storyTextContent}>
                            <h3 className={styles.sectionTitle}>Our Story</h3>
                            <p className={styles.description} style={{ textAlign: 'center' }}>
                                Founded with a passion for culinary excellence, Qitchen's journey began in the heart of Prague. Over years, it evolved into a haven for sushi enthusiasts, celebrated for its artful mastery and devotion to redefining gastronomy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footerRow}>
                    By Pawel Gola  ◇  Licensing  ◇  Styleguide
                </div>

            </div>
        </div>
    );
}
