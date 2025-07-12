import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AIGeneratorClient from './AIGeneratorClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ai' });
  
  return {
    title: `${t('title')} | Creative Media Production House`,
    description: t('description'),
  };
}

export default async function AIGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ai' });

  // Extract all the translation strings we need
  const translations = {
    header: {
      badge: t('generator.header.badge'),
      title: t('generator.header.title'),
      description: t('generator.header.description')
    },
    steps: {
      projectDetails: {
        title: t('generator.steps.projectDetails.title'),
        description: t('generator.steps.projectDetails.description')
      },
      brandMessage: {
        title: t('generator.steps.brandMessage.title'),
        description: t('generator.steps.brandMessage.description')
      },
      creativeDirection: {
        title: t('generator.steps.creativeDirection.title'),
        description: t('generator.steps.creativeDirection.description')
      },
      contactInfo: {
        title: t('generator.steps.contactInfo.title'),
        description: t('generator.steps.contactInfo.description')
      }
    },
    form: {
      projectType: {
        label: t('generator.form.projectType.label'),
        placeholder: t('generator.form.projectType.placeholder'),
        options: {
          tvc: t('generator.form.projectType.options.tvc'),
          kol: t('generator.form.projectType.options.kol'),
          brand: t('generator.form.projectType.options.brand'),
          social: t('generator.form.projectType.options.social'),
          corporate: t('generator.form.projectType.options.corporate')
        }
      },
      industry: {
        label: t('generator.form.industry.label'),
        placeholder: t('generator.form.industry.placeholder'),
        options: {
          technology: t('generator.form.industry.options.technology'),
          fashion: t('generator.form.industry.options.fashion'),
          food: t('generator.form.industry.options.food'),
          finance: t('generator.form.industry.options.finance'),
          healthcare: t('generator.form.industry.options.healthcare'),
          education: t('generator.form.industry.options.education'),
          automotive: t('generator.form.industry.options.automotive'),
          realEstate: t('generator.form.industry.options.realEstate'),
          other: t('generator.form.industry.options.other')
        }
      },
      targetAudience: {
        label: t('generator.form.targetAudience.label'),
        ageRange: {
          label: t('generator.form.targetAudience.ageRange.label'),
          placeholder: t('generator.form.targetAudience.ageRange.placeholder'),
          options: {
            children: t('generator.form.targetAudience.ageRange.options.children'),
            teens: t('generator.form.targetAudience.ageRange.options.teens'),
            youngAdults: t('generator.form.targetAudience.ageRange.options.youngAdults'),
            adults: t('generator.form.targetAudience.ageRange.options.adults'),
            middleAge: t('generator.form.targetAudience.ageRange.options.middleAge'),
            seniors: t('generator.form.targetAudience.ageRange.options.seniors'),
            allAges: t('generator.form.targetAudience.ageRange.options.allAges')
          }
        },
        gender: {
          label: t('generator.form.targetAudience.gender.label'),
          placeholder: t('generator.form.targetAudience.gender.placeholder'),
          options: {
            male: t('generator.form.targetAudience.gender.options.male'),
            female: t('generator.form.targetAudience.gender.options.female'),
            allGender: t('generator.form.targetAudience.gender.options.allGender')
          }
        }
      },
      brandName: {
        label: t('generator.form.brandName.label'),
        placeholder: t('generator.form.brandName.placeholder')
      },
      productDescription: {
        label: t('generator.form.productDescription.label'),
        placeholder: t('generator.form.productDescription.placeholder')
      },
      keyMessage: {
        label: t('generator.form.keyMessage.label'),
        placeholder: t('generator.form.keyMessage.placeholder')
      },
      tone: {
        label: t('generator.form.tone.label'),
        placeholder: t('generator.form.tone.placeholder'),
        options: {
          professional: t('generator.form.tone.options.professional'),
          casual: t('generator.form.tone.options.casual'),
          luxury: t('generator.form.tone.options.luxury'),
          energetic: t('generator.form.tone.options.energetic'),
          emotional: t('generator.form.tone.options.emotional')
        }
      },
      duration: {
        label: t('generator.form.duration.label'),
        placeholder: t('generator.form.duration.placeholder'),
        options: {
          '15s': t('generator.form.duration.options.15s'),
          '30s': t('generator.form.duration.options.30s'),
          '60s': t('generator.form.duration.options.60s'),
          '90s': t('generator.form.duration.options.90s'),
          '120s': t('generator.form.duration.options.120s')
        }
      },
      budget: {
        label: t('generator.form.budget.label'),
        placeholder: t('generator.form.budget.placeholder'),
        options: {
          low: t('generator.form.budget.options.low'),
          medium: t('generator.form.budget.options.medium'),
          high: t('generator.form.budget.options.high'),
          premium: t('generator.form.budget.options.premium')
        }
      },
      imageAspectRatio: {
        label: t('generator.form.imageAspectRatio.label'),
        placeholder: t('generator.form.imageAspectRatio.placeholder'),
        options: {
          '1024x1024': t('generator.form.imageAspectRatio.options.1024x1024'),
          '1024x1792': t('generator.form.imageAspectRatio.options.1024x1792'),
          '1792x1024': t('generator.form.imageAspectRatio.options.1792x1024')
        }
      },
      contact: {
        name: {
          label: t('generator.form.contact.name.label'),
          placeholder: t('generator.form.contact.name.placeholder')
        },
        email: {
          label: t('generator.form.contact.email.label'),
          placeholder: t('generator.form.contact.email.placeholder')
        },
        phone: {
          label: t('generator.form.contact.phone.label'),
          placeholder: t('generator.form.contact.phone.placeholder')
        },
        company: {
          label: t('generator.form.contact.company.label'),
          placeholder: t('generator.form.contact.company.placeholder')
        }
      }
    },
    buttons: {
      next: t('generator.buttons.next'),
      previous: t('generator.buttons.previous'),
      generate: t('generator.buttons.generate'),
      download: t('generator.buttons.download'),
      startOver: t('generator.buttons.startOver')
    },
    generating: t('generator.generating'),
    success: t('generator.success'),
    loading: {
      title: t('generator.loading.title'),
      subtitle: t('generator.loading.subtitle'),
      steps: {
        analyzing: t('generator.loading.steps.analyzing'),
        creating: t('generator.loading.steps.creating'),
        generating: t('generator.loading.steps.generating'),
        finalizing: t('generator.loading.steps.finalizing')
      }
    },
    validation: {
      required: t('generator.validation.required'),
      email: t('generator.validation.email'),
      phone: t('generator.validation.phone'),
      name: t('generator.validation.name'),
      company: t('generator.validation.company'),
      contactIncomplete: t('generator.validation.contactIncomplete'),
      projectIncomplete: t('generator.validation.projectIncomplete')
    }
  };

  return <AIGeneratorClient translations={translations} locale={locale} />;
} 