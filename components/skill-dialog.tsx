import { deleteSkill, getSkills, insertSkill } from '@/actions/skill-actions'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { revalidatePath } from 'next/cache'

export async function SkillDialog() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return null

  const skills = await getSkills(userId)

  async function onCreateSkill(formData: FormData) {
    'use server'
    const skillName = formData.get('skillName')?.toString()
    if (userId && skillName) {
      insertSkill(skillName, userId)
      revalidatePath('/dashboard')
    }
  }

  async function onDeleteSkill(formData: FormData) {
    'use server'
    const skillId = formData.get('skillId')?.toString()
    if (skillId) {
      deleteSkill(skillId)
      revalidatePath('/dashboard')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage skills</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Skills</DialogTitle>
          <DialogDescription>
            Create, edit, and delete skills here.
          </DialogDescription>
        </DialogHeader>

        <form action={onCreateSkill}>
          <Label htmlFor="skillName">Create new skill</Label>
          <div className="flex gap-2">
            <Input id="skillName" name="skillName" placeholder="Skill name" />
            <Button type="submit">Create</Button>
          </div>
        </form>
        <Label className="pt-4">Your skills</Label>
        <div className="flex flex-col">
          {skills.map((skill) => (
            <form
              key={skill.id}
              action={onDeleteSkill}
              className="flex justify-between"
            >
              <span>{skill.name}</span>
              <input type="hidden" name="skillId" value={skill.id} readOnly />
              <Button variant="link">Delete</Button>
            </form>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
