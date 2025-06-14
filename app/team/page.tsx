// app/team/page.tsx
import { Metadata } from 'next'
import { getTeamMembers } from '@/lib/supabase-server'
import TeamScroller from '@/components/TeamScroller'

export const metadata: Metadata = {
  title: 'Our Team - Arivial Sangam',
  description: 'Meet the dedicated team behind Arivial Sangam.',
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="min-h-screen">
      {/* Team Members Section */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
          <div className="w-20 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-2xl">
            Our leadership team brings diverse experience and expertise to guide our organization
            towards achieving its mission and vision.
          </p>
        </div>

        {/* Leadership Members */}
        <TeamScroller
          members={teamMembers.filter(
            (member) =>
              member.role.includes('Director') ||
              member.role.includes('President') ||
              member.role.includes('Chair')
          )}
          type="team"
        />

        <div className="mt-20">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Team Members</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-muted-foreground max-w-2xl">
              Our dedicated team members work tirelessly to implement our initiatives and serve our community.
            </p>
          </div>

          {/* Other Members */}
          <TeamScroller
            members={teamMembers.filter(
              (member) =>
                !member.role.includes('Director') &&
                !member.role.includes('President') &&
                !member.role.includes('Chair')
            )}
            type="team"
          />
        </div>
      </section>

      {/* Join the Team CTA Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                <p className="text-muted-foreground mb-6">
                  We're always looking for passionate individuals who share our vision and want to make 
                  a difference in our community. If you'd like to contribute your skills and time to 
                  our cause, we'd love to hear from you.
                </p>
                <div>
                  <a href="/contact" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                    Get In Touch
                  </a>
                </div>
              </div>
              <div className="bg-muted relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-white text-center px-6">Make A Difference</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
