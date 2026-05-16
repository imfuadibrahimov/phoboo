
export type Language = 'en' | 'az' | 'tr' | 'ru';

export interface Translation {
  // Navigation & Sidebar
  home: string;
  pricing: string;
  events: string;
  calendar: string;
  about: string;
  contact: string;
  profile: string;
  signOut: string;
  freePlan: string;
  
  // Auth
  welcomeBack: string;
  createAccount: string;
  newToPhoboo: string;
  logInGoogle: string;
  orEnterDetails: string;
  email: string;
  password: string;
  signIn: string;
  forgot: string;
  createFreeAccount: string;
  alreadyHaveAccount: string;
  login: string;
  signUpGoogle: string;
  signUpApple: string;
  orUseEmail: string;
  emailAddress: string;
  fullName: string;
  createAccountLabel: string;
  continueWithEmail: string;

  // Pricing
  pricingTitle: string;
  plans: string;
  pricingDesc: string;
  monthly: string;
  yearly: string;
  saveUpTo: string;
  perMonth: string;
  free: string;
  starter: string;
  pro: string;
  proPlus: string;
  tryCoreFeatures: string;
  perfectForBeginners: string;
  mostPopularChoice: string;
  forFullScale: string;
  buyNow: string;
  mostPopular: string;
  heicSupport: string;
  unlimitedEmail: string;
  twoEvents: string;
  unlimitedEvents: string;
  unlimitedFaceSearch: string;
  photoUpload15: string;
  photoUpload50: string;
  storage10: string;
  storage125: string;
  storage500: string;
  storage1000: string;
  uncompressedPhotos: string;
  saveWithYearly: string;
  normally: string;
  billedYearly: string;
  whatsIncluded: string;
  cancelAnytime: string;
  
  // Events View
  myEvents: string;
  recentEvents: string;
  createNewEvent: string;
  searchEvents: string;
  sortBy: string;
  viewDetails: string;
  editEvent: string;
  deleteEvent: string;
  confirmDelete: string;
  deletePermanently: string;
  wait: string;
  grid: string;
  list: string;
  photoDetails: string;
  imagesSelected: string;
  selectAll: string;
  hide: string;
  unhide: string;
  delete: string;
  download: string;
  move: string;
  rotate: string;
  fullResolution: string;
  share: string;
  of: string;
  publicProfile: string;
  manageProfessionalInfo: string;
  deletePhoto: string;
  security: string;
  setPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  passwordsDoNotMatch: string;
  characterLimitExceeded: string;
  nameLabel: string;
  descLabel: string;
  durationLabel: string;
  dateLabel: string;
  startDateLabel: string;
  endDateLabel: string;
  singleDay: string;
  multipleDays: string;
  namePlaceholder: string;
  descPlaceholder: string;
  discardChanges: string;
  saveChanges: string;
  
  undoNote: string;
  showingAll: string;
  searchFile: string;
  smartAutoRotate: string;
  confirmAutoRotateSelected: string;
  confirmAutoRotateAll: string;
  oldestFirst: string;
  newestFirst: string;
  dragAndDrop: string;
  uploadImages: string;
  publish: string;
  setCoverImage: string;
  addFolder: string;
  moreOptions: string;
  setCover: string;
  highlights: string;
  
  // New Dashboard & Events View keys
  totalEvents: string;
  totalFolders: string;
  storageUsed: string;
  dateCreated: string;
  eventDate: string;
  photoCount: string;
  storageSize: string;
  name: string;
  event: string;
  photos: string;
  faceSearches: string;
  registrations: string;
  status: string;
  fromDate: string;
  toDate: string;
  actions: string;
  eventIdLabel: string;
  draft: string;
  published: string;
  
  // Event Settings Modal
  generalSettings: string;
  shareSettings: string;
  galleryDesign: string;
  eventNameLabel: string;
  albumPresets: string;
  themeClassicCream: string;
  themeAlmondWhite: string;
  themeModernDark: string;
  themeEtherealBlue: string;
  themeRoyalGold: string;
  themeVelvetNight: string;
  coverStyles: string;
  coverStyleClassicOval: string;
  coverStyleElegantPill: string;
  coverStyleSoftCircle: string;
  coverStyleBrutalistRect: string;
  livePreview: string;
  accessType: string;
  faceSearchAccess: string;
  fullAccess: string;
  guestLinks: string;
  fullAccessGallery: string;
  faceSearchAccessOnly: string;
  downloadQRCodes: string;
  downloadQRDesc: string;
  downloadKit: string;
  passwordProtection: string;
  passwordProtectionDesc: string;
  securityPIN: string;
  copy: string;
  eventRegistration: string;
  eventRegistrationDesc: string;
  visible: string;
  hidden: string;
  showOnGuestPage: string;
  
  // Profile & Social Media
  profilePicture: string;
  profileLabel: string;
  surname: string;
  googleSignInDesc: string;
  notSet: string;
  socialMediaLabel: string;
  contactVisibilityLabel: string;
  instagramLabel: string;
  facebookLabel: string;
  linkedInLabel: string;
  pinterestLabel: string;
  
  // Calendar
  today: string;
  month: string;
  year: string;
  clickToViewDetail: string;

  // Gallery
  loadingGallery: string;
  theGallery: string;
  showingMoments: string;
  wideView: string;
  standardView: string;
  compactView: string;
  findYourSpecialMoments: string;
  uploadSelfieDesc: string;
  takeASelfie: string;
  uploadProfile: string;
  privacyFirstDesc: string;
  privateAccessTitle: string;
  privateAccessDesc: string;
  highQualityTitle: string;
  highQualityDesc: string;
  instantResultsTitle: string;
  instantResultsDesc: string;
  
  // Profile
  personalInfo: string;
  updateProfile: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  visibility: string;
  showEmail: string;
  showPhone: string;
  changePassword: string;
  currentPassword: string;
  confirmPassword: string;
  save: string;
  cancel: string;
  confirm: string;
  noPhotosNeedRotate: string;
  successOriented: string;
  
  // Guest View
  welcomeToEvent: string;
  galleryBy: string;
  viewGallery: string;
  faceSearch: string;
  searchByFace: string;
  uploadFaceDesc: string;
  findMyPhotos: string;
  noPhotosFound: string;
  
  // Public Landing Page
  heroTitle: string;
  heroSub: string;
  shoot: string;
  upload: string;
  delivered: string;
  instantMatching: string;
  aiFaceSearch: string;
  aiFaceSearchDesc: string;
  smartFiltering: string;
  smartFilteringDesc: string;
  elegantUI: string;
  elegantUIDesc: string;
  oneTapSharing: string;
  oneTapSharingDesc: string;
  whyChoose: string;
  whyChooseSub: string;
  howItWorks: string;
  howItWorksSub: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  builtForEvery: string;
  builtForEverySub: string;
  seeAllCategories: string;
  readyToAutomate: string;
  getStartedNow: string;
  getStarted: string;
  aiFaceSearchWhyDesc: string;
  qrSharingTitle: string;
  qrSharingDesc: string;
  autoExpiringTitle: string;
  autoExpiringDesc: string;
  smartBrowsingTitle: string;
  smartBrowsingDesc: string;
  collaborativeEventsTitle: string;
  collaborativeEventsDesc: string;
  privacySafeTitle: string;
  privacySafeDesc: string;
  categoryWeddings: string;
  categoryWeddingsDesc: string;
  categoryCorporate: string;
  categoryCorporateDesc: string;
  categorySports: string;
  categorySportsDesc: string;
  categoryNightlife: string;
  categoryNightlifeDesc: string;
  
  // Misc
  poweredBy: string;
  photographer: string;
  meetPhotographer: string;
  footerDesc: string;
  copyright: string;
  legal: string;
  privacy: string;
  terms: string;
  supportTitle: string;
  globalSupport: string;
  documentation: string;
  connect: string;
  weekdaysShort: string[];
  weekdaysMin: string[];
}

export const translations: Record<Language, Translation> = {
  en: {
    home: 'Home',
    pricing: 'Pricing',
    events: 'Events',
    calendar: 'Calendar',
    about: 'About',
    contact: 'Contact',
    profile: 'Profile',
    signOut: 'Sign Out',
    freePlan: 'Free Plan',
    welcomeBack: 'Welcome Back',
    createAccount: 'Create account',
    newToPhoboo: 'New to Phoboo?',
    logInGoogle: 'Log in with Google',
    orEnterDetails: 'Or enter details',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    forgot: 'Forgot?',
    createFreeAccount: 'Create your free account',
    alreadyHaveAccount: 'Already have an account?',
    login: 'Log in',
    signUpGoogle: 'Sign up with Google',
    signUpApple: 'Sign up with Apple',
    orUseEmail: 'Or use your email',
    emailAddress: 'Email Address',
    fullName: 'Full Name',
    createAccountLabel: 'Create Account',
    continueWithEmail: 'Continue with Email',
    pricingTitle: 'Pricing &',
    plans: 'Plans',
    pricingDesc: 'We offer simple, transparent pricing designed to scale with your photography business. Compare plans and find your perfect fit.',
    monthly: 'Monthly',
    yearly: 'Yearly',
    saveUpTo: 'Save up to 40%',
    perMonth: '/month',
    free: 'Free',
    starter: 'Starter',
    pro: 'Pro',
    proPlus: 'Pro Plus',
    tryCoreFeatures: 'Try core features for free',
    perfectForBeginners: 'Perfect for beginners',
    mostPopularChoice: 'Most popular choice',
    forFullScale: 'For full-scale operations',
    buyNow: 'Buy Now',
    mostPopular: 'Most Popular',
    heicSupport: 'Apple Image Format (.HEIC) Support',
    unlimitedEmail: 'Unlimited email notifications',
    twoEvents: '2 events',
    unlimitedEvents: 'Unlimited events',
    unlimitedFaceSearch: 'Unlimited face search',
    photoUpload15: '15 MB photo upload',
    photoUpload50: '50 MB photo upload',
    storage10: '10 GB storage',
    storage125: '125 GB storage',
    storage500: '500 GB storage',
    storage1000: '1000 GB storage',
    uncompressedPhotos: 'Uncompressed Photos',
    saveWithYearly: 'SAVE 50% WITH YEARLY BILLING',
    normally: 'Normally',
    billedYearly: 'Billed yearly',
    whatsIncluded: "What's Included",
    cancelAnytime: 'You can upgrade, downgrade, or cancel anytime — no long-term commitments.',
    undoNote: 'This action cannot be undone and all data will be permanently removed.',
    showingAll: 'Showing: All',
    searchFile: 'Search a file',
    smartAutoRotate: 'Smart Auto Rotate',
    confirmAutoRotateSelected: 'Do you want to fix the orientation of the {count} selected photos? This will permanently adjust them to their natural position.',
    confirmAutoRotateAll: 'All photos in this event will be automatically oriented based on their camera metadata. This helps ensure people look natural. Proceed?',
    oldestFirst: 'Oldest first',
    newestFirst: 'Newest first',
    dragAndDrop: 'Drag & Drop',
    uploadImages: 'Upload Images',
    publish: 'Publish',
    setCoverImage: 'Set Cover Image',
    addFolder: 'Add Folder',
    moreOptions: 'More Options',
    setCover: 'Set Cover',
    highlights: 'Highlights',
    myEvents: 'My Events',
    recentEvents: 'Recent Events',
    createNewEvent: 'Create New Event',
    searchEvents: 'Search events',
    sortBy: 'Sort by',
    viewDetails: 'View Details',
    editEvent: 'Edit Event',
    deleteEvent: 'Delete Event',
    confirmDelete: 'Confirm Delete',
    deletePermanently: 'Delete Permanently',
    wait: 'Wait',
    grid: 'Grid',
    list: 'List',
    photoDetails: 'Photo Details',
    imagesSelected: 'Images Selected',
    selectAll: 'Select All',
    hide: 'Hide',
    unhide: 'Unhide',
    delete: 'Delete',
    download: 'Download',
    move: 'Move',
    rotate: 'Rotate',
    fullResolution: 'Full Resolution',
    share: 'Share',
    of: 'of',
    publicProfile: 'Public Profile',
    manageProfessionalInfo: 'Manage your professional information and how it appears to guests.',
    deletePhoto: 'Delete Photo',
    security: 'Security',
    setPassword: 'Set Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    passwordsDoNotMatch: 'Passwords do not match',
    characterLimitExceeded: 'Character limit exceeded',
    nameLabel: 'Name *',
    descLabel: 'Description',
    durationLabel: 'Event Duration',
    dateLabel: 'Event Date',
    startDateLabel: 'Start Date',
    endDateLabel: 'End Date',
    singleDay: 'Single Day',
    multipleDays: 'Multiple Days',
    namePlaceholder: 'Event Name',
    descPlaceholder: 'Event Description',
    discardChanges: 'Discard Changes',
    saveChanges: 'Save Changes',
    totalEvents: 'total events',
    totalFolders: 'folders',
    storageUsed: 'storage used',
    dateCreated: 'Date Created',
    eventDate: 'Event Date',
    photoCount: 'Photo Count',
    storageSize: 'Storage Size',
    name: 'Name',
    event: 'Event',
    photos: 'Photos',
    faceSearches: 'Face Searches',
    registrations: 'Registrations',
    status: 'Status',
    fromDate: 'From Date',
    toDate: 'To Date',
    actions: 'Actions',
    eventIdLabel: 'Event ID',
    draft: 'Draft',
    published: 'Published',
    generalSettings: 'General Settings',
    shareSettings: 'Share Settings',
    galleryDesign: 'Gallery Design',
    eventNameLabel: 'Event Name *',
    albumPresets: 'Album Presets',
    themeClassicCream: 'Classic Cream',
    themeAlmondWhite: 'Almond White',
    themeModernDark: 'Modern Dark',
    themeEtherealBlue: 'Ethereal Blue',
    themeRoyalGold: 'Royal Gold',
    themeVelvetNight: 'Velvet Night',
    coverStyles: 'Cover Styles',
    coverStyleClassicOval: 'Classic Oval',
    coverStyleElegantPill: 'Elegant Pill',
    coverStyleSoftCircle: 'Soft Circle',
    coverStyleBrutalistRect: 'Brutalist Rect',
    livePreview: 'Live Preview',
    accessType: 'Access Type',
    faceSearchAccess: 'Face search access',
    fullAccess: 'Full access',
    guestLinks: 'Guest Links',
    fullAccessGallery: 'Full Access Gallery',
    faceSearchAccessOnly: 'Face Search Access Only',
    downloadQRCodes: 'Download QR Codes',
    downloadQRDesc: 'Print these on table cards or display them at your event venue.',
    downloadKit: 'Download Kit',
    passwordProtection: 'Password Protection',
    passwordProtectionDesc: 'Protect your gallery with a 4-digit PIN',
    securityPIN: 'Security PIN',
    copy: 'Copy',
    eventRegistration: 'Event Registration',
    eventRegistrationDesc: 'Require guests to register before viewing',
    visible: 'Visible',
    hidden: 'Hidden',
    showOnGuestPage: 'Show on Guest Page',
    profilePicture: 'Profile Picture',
    profileLabel: 'Profile',
    surname: 'Surname',
    googleSignInDesc: 'You are signed in with Google',
    notSet: 'Not set',
    socialMediaLabel: 'Social Media',
    contactVisibilityLabel: 'Contact & Visibility',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
    linkedInLabel: 'LinkedIn',
    pinterestLabel: 'Pinterest',
    today: 'Today',
    month: 'Month',
    year: 'Year',
    clickToViewDetail: 'Click to view detail',
    loadingGallery: 'Loading Gallery...',
    theGallery: 'The Gallery',
    showingMoments: 'Showing moments',
    wideView: 'Wide View',
    standardView: 'Standard View',
    compactView: 'Compact View',
    findYourSpecialMoments: 'Find Your Special Moments',
    uploadSelfieDesc: 'Upload a photo of yourself and our AI will find every image from the event that features your smile.',
    takeASelfie: 'Take a Selfie',
    uploadProfile: 'Upload Profile',
    privacyFirstDesc: 'Privacy First: Your photo is only used for searching',
    privateAccessTitle: 'Private Access',
    privateAccessDesc: 'Only you see your matched photos',
    highQualityTitle: 'High Quality',
    highQualityDesc: 'Download uncompressed originals',
    instantResultsTitle: 'Instant Results',
    instantResultsDesc: 'Find photos across thousands in seconds',
    personalInfo: 'Personal Information',
    updateProfile: 'Update Profile',
    firstName: 'First Name',
    lastName: 'Last Name',
    phoneNumber: 'Phone Number',
    visibility: 'Visibility',
    showEmail: 'Show email on guest page',
    showPhone: 'Show phone on guest page',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    confirmPassword: 'Confirm New Password',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    noPhotosNeedRotate: 'No photos needed orientation fixing.',
    successOriented: 'Successfully oriented {count} photos!',
    welcomeToEvent: 'Welcome to',
    galleryBy: 'Gallery by {name}',
    viewGallery: 'View Gallery',
    faceSearch: 'Face Search',
    searchByFace: 'Search by Face',
    uploadFaceDesc: 'Upload a selfie and we\'ll find all photos of you from the event.',
    findMyPhotos: 'Find My Photos',
    noPhotosFound: 'No photos found',
    heroTitle: 'The fastest way to',
    heroSub: 'deliver event photos.',
    shoot: 'Shoot',
    upload: 'Upload',
    delivered: 'Delivered',
    instantMatching: 'Instant Matching',
    aiFaceSearch: 'AI face search',
    aiFaceSearchDesc: 'Find every photo you\'re in instantly using advanced facial recognition.',
    smartFiltering: 'Smart filtering',
    smartFilteringDesc: 'Effortlessly sort through entire galleries by gender and person count.',
    elegantUI: 'Elegant gallery UI',
    elegantUIDesc: 'A premium, distraction-free viewing experience designed for high-end events.',
    oneTapSharing: 'One-tap sharing',
    oneTapSharingDesc: 'Instantly download or share high-resolution memories with a single tap.',
    whyChoose: 'Why Choose Phoboo',
    whyChooseSub: 'Professional speed and simplicity for modern event photographers.',
    howItWorks: 'How Phoboo Works',
    howItWorksSub: 'Three simple steps to automate your gallery delivery.',
    step1Title: 'Create Your Event',
    step1Desc: 'Set up your event in seconds.',
    step2Title: 'Upload Your Photos',
    step2Desc: 'Upload all photos at once or add them anytime.',
    step3Title: 'Share & Let Guests Find Photos',
    step3Desc: 'Share a QR or link. Guests can browse or instantly find theirs with AI.',
    builtForEvery: 'Built for Every Occasion',
    builtForEverySub: 'Specialized workflows for diverse photography niches.',
    seeAllCategories: 'See all categories',
    readyToAutomate: 'Ready to automate your delivery?',
    getStartedNow: 'Get started for free today and transform your photo delivery.',
    getStarted: 'Get Started',
    aiFaceSearchWhyDesc: 'Guests instantly find their photos with AI-powered face search.',
    qrSharingTitle: 'QR-Based Sharing',
    qrSharingDesc: 'Share a single link or QR code. Everyone gets instant access.',
    autoExpiringTitle: 'Auto-Expiring Events',
    autoExpiringDesc: 'Events automatically expire after a set time to keep things simple and secure.',
    smartBrowsingTitle: 'Smart Browsing & Filters',
    smartBrowsingDesc: 'Guests can browse all photos or filter by gender, group size, and more.',
    collaborativeEventsTitle: 'Collaborative Events',
    collaborativeEventsDesc: 'Invite multiple photographers to one event and upload photos together seamlessly.',
    privacySafeTitle: 'Privacy-Safe Recognition',
    privacySafeDesc: 'Face recognition is built with privacy in mind—your data stays secure and protected.',
    categoryWeddings: 'Weddings',
    categoryWeddingsDesc: 'Automated guest galleries.',
    categoryCorporate: 'Corporate',
    categoryCorporateDesc: 'Headshots and seminars.',
    categorySports: 'Sports',
    categorySportsDesc: 'Athlete photo tagging.',
    categoryNightlife: 'Nightlife',
    categoryNightlifeDesc: 'Club and festival sharing.',
    poweredBy: 'Powered by Phoboo',
    photographer: 'Professional Photographer',
    meetPhotographer: 'Meet the Photographer',
    footerDesc: 'Elevating professional photography through intelligent automation and seamless cloud delivery.',
    copyright: '© 2024 Phoboo. All rights reserved.',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    supportTitle: 'Support',
    globalSupport: 'Global Support',
    documentation: 'Documentation',
    connect: 'Connect',
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  },
  az: {
    home: 'Ana Səhifə',
    pricing: 'Qiymətlər',
    events: 'Tədbirlər',
    calendar: 'Təqvim',
    about: 'Haqqımızda',
    contact: 'Əlaqə',
    profile: 'Profil',
    signOut: 'Çıxış',
    freePlan: 'Pulsuz Plan',
    welcomeBack: 'Xoş gəldiniz',
    createAccount: 'Hesab yarat',
    newToPhoboo: 'Phoboo-da yenisiniz?',
    logInGoogle: 'Google ilə daxil ol',
    orEnterDetails: 'Və ya məlumatları daxil edin',
    email: 'Email',
    password: 'Şifrə',
    signIn: 'Daxil ol',
    forgot: 'Unutmusunuz?',
    createFreeAccount: 'Pulsuz hesab yaradın',
    alreadyHaveAccount: 'Artıq hesabınız var?',
    login: 'Daxil ol',
    signUpGoogle: 'Google ilə qeydiyyatdan keçin',
    signUpApple: 'Apple ilə qeydiyyatdan keçin',
    orUseEmail: 'Və ya e-poçtunuzdan istifadə edin',
    emailAddress: 'E-poçt ünvanı',
    fullName: 'Tam ad',
    createAccountLabel: 'Hesab yarat',
    continueWithEmail: 'E-poçt ilə davam edin',
    pricingTitle: 'Qiymətlər və',
    plans: 'Planlar',
    pricingDesc: 'Biz sizin fotoqrafiya biznesinizlə miqyaslanan sadə, şəffaf qiymətlər təklif edirik. Planları müqayisə edin və mükəmməl uyğunluğu tapın.',
    monthly: 'Aylıq',
    yearly: 'İllik',
    saveUpTo: '40%-ə qədər qənaət edin',
    perMonth: '/ay',
    free: 'Pulsuz',
    starter: 'Başlanğıc',
    pro: 'Pro',
    proPlus: 'Pro Plus',
    tryCoreFeatures: 'Əsas funksiyaları pulsuz sınaqdan keçirin',
    perfectForBeginners: 'Yeni başlayanlar üçün mükəmməldir',
    mostPopularChoice: 'Ən populyar seçim',
    forFullScale: 'Tam miqyaslı əməliyyatlar üçün',
    buyNow: 'İndi al',
    mostPopular: 'Ən Populyar',
    heicSupport: 'Apple Şəkil Formatına (.HEIC) Dəstək',
    unlimitedEmail: 'Limitsiz e-poçt bildirişləri',
    twoEvents: '2 tədbir',
    unlimitedEvents: 'Limitsiz tədbirlər',
    unlimitedFaceSearch: 'Limitsiz üz axtarışı',
    photoUpload15: '15 MB şəkil yükləmə',
    photoUpload50: '50 MB şəkil yükləmə',
    storage10: '10 GB yaddaş',
    storage125: '125 GB yaddaş',
    storage500: '500 GB yaddaş',
    storage1000: '1000 GB yaddaş',
    uncompressedPhotos: 'Sıxılmamış Şəkillər',
    saveWithYearly: 'İLLİK ÖDƏNİŞLƏ 50% QƏNAƏT EDİN',
    normally: 'Normalda',
    billedYearly: 'İllik hesablanır',
    whatsIncluded: 'Nələr Daxildir',
    cancelAnytime: 'İstənilən vaxt təkmilləşdirə, azalda və ya ləğv edə bilərsiniz — uzunmüddətli öhdəliklər yoxdur.',
    undoNote: 'Bu əməliyyat geri qaytarıla bilməz və bütün məlumatlar həmişəlik silinəcək.',
    showingAll: 'Göstərilir: Hamısı',
    searchFile: 'Fayl axtar',
    smartAutoRotate: 'Ağıllı Avtomatik Döndərmə',
    confirmAutoRotateSelected: 'Seçilmiş {count} şəklin istiqamətini düzəltmək istəyirsiniz? Bu, onları həmişəlik təbii vəziyyətlərinə gətirəcək.',
    confirmAutoRotateAll: 'Bu tədbirdəki bütün şəkillər kamera metadata məlumatlarına əsasən avtomatik olaraq istiqamətləndiriləcək. Bu, insanların təbii görünməsini təmin edir. Davam edək?',
    oldestFirst: 'Əvvəlcə köhnələr',
    newestFirst: 'Əvvəlcə yenilər',
    dragAndDrop: 'Sürüklə və Burax',
    uploadImages: 'Şəkilləri Yüklə',
    publish: 'Dərc et',
    setCoverImage: 'Üz Qabığı Şəkli Təyin Et',
    addFolder: 'Qovluq Əlavə Et',
    moreOptions: 'Daha çox seçim',
    setCover: 'Üz qabığı təyin et',
    highlights: 'Vurğulananlar',
    myEvents: 'Mənim Tədbirlərim',
    recentEvents: 'Son Tədbirlər',
    createNewEvent: 'Yeni Tədbir Yarat',
    searchEvents: 'Tədbirləri axtar',
    sortBy: 'Sırala',
    viewDetails: 'Ətraflı bax',
    editEvent: 'Tədbiri Redaktə Et',
    deleteEvent: 'Tədbiri Sil',
    confirmDelete: 'Silməni Təsdiqlə',
    deletePermanently: 'Həmişəlik Sil',
    wait: 'Gözləyin',
    grid: 'Tor',
    list: 'Siyahı',
    photoDetails: 'Foto detalları',
    imagesSelected: 'Şəkil seçildi',
    selectAll: 'Hamısını seç',
    hide: 'Gizlə',
    unhide: 'Göstər',
    delete: 'Sil',
    download: 'Yüklə',
    move: 'Köçür',
    rotate: 'Döndər',
    fullResolution: 'Tam ölçü',
    share: 'Paylaş',
    of: '/',
    publicProfile: 'İctimai Profil',
    manageProfessionalInfo: 'Peşəkar məlumatlarınızı və onun qonaqlara necə görünəcəyini idarə edin.',
    deletePhoto: 'Şəkli Sil',
    security: 'Təhlükəsizlik',
    setPassword: 'Şifrə Təyin Et',
    newPassword: 'Yeni Şifrə',
    confirmNewPassword: 'Yeni Şifrəni Təsdiqlə',
    passwordsDoNotMatch: 'Şifrələr uyğun gəlmir',
    characterLimitExceeded: 'Simvol limiti aşıldı',
    nameLabel: 'Ad *',
    descLabel: 'Təsvir',
    durationLabel: 'Tədbir müddəti',
    dateLabel: 'Tədbir tarixi',
    startDateLabel: 'Başlanğıc tarixi',
    endDateLabel: 'Bitmə tarixi',
    singleDay: 'Bir günlük',
    multipleDays: 'Çox günlük',
    namePlaceholder: 'Tədbirin adı',
    descPlaceholder: 'Tədbirin təsviri',
    discardChanges: 'Dəyişikliklərdən imtina et',
    saveChanges: 'Dəyişiklikləri yadda saxla',
    totalEvents: 'tədbir sayı',
    totalFolders: 'qovluq',
    storageUsed: 'yaddaş istifadə olunub',
    dateCreated: 'Yaradılma Tarixi',
    eventDate: 'Tədbir Tarixi',
    photoCount: 'Şəkil Sayı',
    storageSize: 'Yaddaş Ölçüsü',
    name: 'Ad',
    event: 'Tədbir',
    photos: 'Şəkillər',
    faceSearches: 'Üz Axtarışları',
    registrations: 'Qeydiyyatlar',
    status: 'Status',
    fromDate: 'Başlanğıc Tarixi',
    toDate: 'Bitmə Tarixi',
    actions: 'Əməliyyatlar',
    eventIdLabel: 'Tədbir ID',
    draft: 'Qaralama',
    published: 'Dərc edilib',
    generalSettings: 'Ümumi Parametrlər',
    shareSettings: 'Paylaşım Parametrləri',
    galleryDesign: 'Qalereya Dizaynı',
    eventNameLabel: 'Tədbirin Adı *',
    albumPresets: 'Albom Hazır Ayarları',
    themeClassicCream: 'Klassik Krem',
    themeAlmondWhite: 'Badam Ağlığı',
    themeModernDark: 'Modern Qara',
    themeEtherealBlue: 'Efir Mavisi',
    themeRoyalGold: 'Kral Qızılı',
    themeVelvetNight: 'Məxmər Gecə',
    coverStyles: 'Üz qabığı Üslubları',
    coverStyleClassicOval: 'Klassik Oval',
    coverStyleElegantPill: 'Eleqant Həb',
    coverStyleSoftCircle: 'Yumşaq Dairə',
    coverStyleBrutalistRect: 'Brutalist Düzbucaqlı',
    livePreview: 'Canlı Ön Baxış',
    accessType: 'Giriş Növü',
    faceSearchAccess: 'Üz axtarışı girişi',
    fullAccess: 'Tam giriş',
    guestLinks: 'Qonaq Linkləri',
    fullAccessGallery: 'Tam Giriş Qalereyası',
    faceSearchAccessOnly: 'Yalnız Üz Axtarışı Girişi',
    downloadQRCodes: 'QR Kodları Yüklə',
    downloadQRDesc: 'Bunları masa kartlarında çap edin və ya tədbir məkanınızda nümayiş etdirin.',
    downloadKit: 'Yükləmə Dəsti',
    passwordProtection: 'Şifrə Qoruması',
    passwordProtectionDesc: 'Qalereyanızı 4 rəqəmli PIN ilə qoruyun',
    securityPIN: 'Təhlükəsizlik PIN-i',
    copy: 'Kopyala',
    eventRegistration: 'Tədbir Qeydiyyatı',
    eventRegistrationDesc: 'Baxışdan əvvəl qonaqlardan qeydiyyatdan keçməyi tələb edin',
    visible: 'Görünən',
    hidden: 'Gizli',
    showOnGuestPage: 'Qonaq Səhifəsində Göstər',
    profilePicture: 'Profil Şəkli',
    profileLabel: 'Profil',
    surname: 'Soyad',
    googleSignInDesc: 'Siz Google ilə daxil olmusunuz',
    notSet: 'Təyin edilməyib',
    socialMediaLabel: 'Sosial Media',
    contactVisibilityLabel: 'Əlaqə və Görünüş',
    instagramLabel: 'İnstagram',
    facebookLabel: 'Facebook',
    linkedInLabel: 'LinkedIn',
    pinterestLabel: 'Pinterest',
    today: 'Bu gün',
    month: 'Ay',
    year: 'İl',
    clickToViewDetail: 'Ətraflı baxmaq üçün klikləyin',
    loadingGallery: 'Qalereya yüklənir...',
    theGallery: 'Qalereya',
    showingMoments: 'an göstərilir',
    wideView: 'Geniş Baxış',
    standardView: 'Standart Baxış',
    compactView: 'Yığcam Baxış',
    findYourSpecialMoments: 'Xüsusi Anlarınızı Tapın',
    uploadSelfieDesc: 'Öz şəklinizi yükləyin və süni intellektimiz tədbirdən sizin təbəssümünüz olan hər bir şəkli tapacaq.',
    takeASelfie: 'Selfi Çək',
    uploadProfile: 'Profil Yüklə',
    privacyFirstDesc: 'Məxfilik Öndə: Şəkliniz yalnız axtarış üçün istifadə olunur',
    privateAccessTitle: 'Şəxsi Giriş',
    privateAccessDesc: 'Yalnız siz uyğun gələn fotolarınızı görürsünüz',
    highQualityTitle: 'Yüksək Keyfiyyət',
    highQualityDesc: 'Sıxılmamış orijinalları yükləyin',
    instantResultsTitle: 'Anında Nəticələr',
    instantResultsDesc: 'Minlərlə şəkil arasından saniyələr içində fotoları tapın',
    personalInfo: 'Şəxsi Məlumatlar',
    updateProfile: 'Profili yenilə',
    firstName: 'Ad',
    lastName: 'Soyad',
    phoneNumber: 'Telefon Nömrəsi',
    visibility: 'Görünüş',
    showEmail: 'Email qonaq səhifəsində görünsün',
    showPhone: 'Telefon qonaq səhifəsində görünsün',
    changePassword: 'Şifrəni Dəyiş',
    currentPassword: 'Cari Şifrə',
    confirmPassword: 'Yeni Şifrəni Təsdiqlə',
    save: 'Yadda saxla',
    cancel: 'Ləğv et',
    confirm: 'Təsdiqlə',
    noPhotosNeedRotate: 'Şəkillərin istiqamətini düzəltməyə ehtiyac yoxdur.',
    successOriented: '{count} fotoşəkil müvəffəqiyyətlə istiqamətləndirildi!',
    welcomeToEvent: 'Xoş gəlmisiniz',
    galleryBy: '{name} tərəfindən qalereya',
    viewGallery: 'Qalereyaya bax',
    faceSearch: 'Üz Tanıma',
    searchByFace: 'Üz ilə Axtar',
    uploadFaceDesc: 'Selfi yükləyin və biz sizin tədbirdəki bütün fotolarınızı tapacağıq.',
    findMyPhotos: 'Fotolarımı tap',
    noPhotosFound: 'Foto tapılmadı',
    heroTitle: 'Tədbir fotolarını çatdırmağın',
    heroSub: 'ən sürətli yolu.',
    shoot: 'Çək',
    upload: 'Yüklə',
    delivered: 'Çatdırıldı',
    instantMatching: 'Anında Uyğunlaşma',
    aiFaceSearch: 'Süni intellektlə üz axtarışı',
    aiFaceSearchDesc: 'Qabaqcıl üz tanıma texnologiyasından istifadə edərək olduğunuz hər bir fotonu anında tapın.',
    smartFiltering: 'Ağıllı filtrləmə',
    smartFilteringDesc: 'Bütün qalereyaları cinsiyyət və insan sayına görə asanlıqla çeşidləyin.',
    elegantUI: 'Eleqant qalereya interfeysi',
    elegantUIDesc: 'Yüksək səviyyəli tədbirlər üçün hazırlanmış premium, yayındırmayan baxış təcrübəsi.',
    oneTapSharing: 'Bir toxunuşla paylaşma',
    oneTapSharingDesc: 'Tək bir toxunuşla yüksək keyfiyyətli xatirələri anında yükləyin və ya paylaşın.',
    whyChoose: 'Niyə Phoboo?',
    whyChooseSub: 'Müasir tədbir fotoqrafları üçün peşəkar sürət və sadəlik.',
    howItWorks: 'Phoboo necə işləyir?',
    howItWorksSub: 'Qalereya çatdırılmasını avtomatlaşdırmaq üçün üç sadə addım.',
    step1Title: 'Tədbirinizi yaradın',
    step1Desc: 'Tədbirinizi saniyələr ərzində qurun.',
    step2Title: 'Fotolarınızı yükləyin',
    step2Desc: 'Bütün fotoları birdən-birə yükləyin və ya istənilən vaxt əlavə edin.',
    step3Title: 'Paylaşın və qonaqlar fotoları tapsınlar',
    step3Desc: 'QR kod və ya link paylaşın. Qonaqlar baxa və ya süni intellektlə öz fotolarını tapa bilərlər.',
    builtForEvery: 'Hər bir hadisə üçün hazırlanıb',
    builtForEverySub: 'Müxtəlif fotoqrafiya sahələri üçün ixtisaslaşmış iş axınları.',
    seeAllCategories: 'Bütün kateqoriyalara bax',
    readyToAutomate: 'Çatdırılmanızı avtomatlaşdırmağa hazırsınız?',
    getStartedNow: 'Bu gün pulsuz başlayın və foto çatdırılmanızı transformasiya edin.',
    getStarted: 'Başlayın',
    aiFaceSearchWhyDesc: 'Qonaqlar süni intellektlə dəstəklənən üz axtarışı ilə öz fotolarını dərhal tapırlar.',
    qrSharingTitle: 'QR-əsaslı Paylaşım',
    qrSharingDesc: 'Tək bir link və ya QR kod paylaşın. Hər kəs anında giriş əldə edir.',
    autoExpiringTitle: 'Avtomatik bitən tədbirlər',
    autoExpiringDesc: 'İşləri sadə və təhlükəsiz saxlamaq üçün tədbirlər müəyyən edilmiş vaxtdan sonra avtomatik olaraq başa çatır.',
    smartBrowsingTitle: 'Ağıllı Baxış və Filtrlər',
    smartBrowsingDesc: 'Qonaqlar bütün fotolara baxa və ya cinsiyyət, qrup ölçüsü və s. görə filtr edə bilərlər.',
    collaborativeEventsTitle: 'Birgə Tədbirlər',
    collaborativeEventsDesc: 'Bir tədbirə çoxlu fotoqraf dəvət edin və fotoları birlikdə problemsiz yükləyin.',
    privacySafeTitle: 'Məxfiliyə əsaslanan Tanıma',
    privacySafeDesc: 'Üz tanıma məxfiliyi nəzərə alaraq qurulub — məlumatlarınız təhlükəsiz və qorunur.',
    categoryWeddings: 'Toylar',
    categoryWeddingsDesc: 'Qonaqlar üçün avtomatlaşdırılmış qalereyalar.',
    categoryCorporate: 'Korporativ',
    categoryCorporateDesc: 'Baş çəkilişləri və seminarlar.',
    categorySports: 'İdman',
    categorySportsDesc: 'İdmançı fotolarının etiketlənməsi.',
    categoryNightlife: 'Gecə Həyatı',
    categoryNightlifeDesc: 'Klub və festival paylaşımı.',
    poweredBy: 'Phoboo tərəfindən dəstəklənir',
    photographer: 'Peşəkar Fotoqraf',
    meetPhotographer: 'Fotoqrafla Tanışlıq',
    footerDesc: 'İntellektual avtomatlaşdırma və qüsursuz bulud çatdırılması vasitəsilə peşəkar fotoqrafiyanı yüksəldirik.',
    copyright: '© 2024 Phoboo. Bütün hüquqlar qorunur.',
    legal: 'Hüquqi',
    privacy: 'Məxfilik',
    terms: 'Şərtlər',
    supportTitle: 'Dəstək',
    globalSupport: 'Qlobal Dəstək',
    documentation: 'Sənədlər',
    connect: 'Əlaqə',
    weekdaysShort: ['Ba.', 'Be.', 'Ça.', 'Çə.', 'Ca.', 'Cü.', 'Şə.'],
    weekdaysMin: ['B', 'B', 'Ç', 'Ç', 'C', 'C', 'Ş'],
  },
  tr: {
    home: 'Ana Sayfa',
    pricing: 'Fiyatlandırma',
    events: 'Etkinlikler',
    calendar: 'Takvim',
    about: 'Hakkımızda',
    contact: 'İletişim',
    profile: 'Profil',
    signOut: 'Çıkış Yap',
    freePlan: 'Ücretsiz Plan',
    welcomeBack: 'Tekrar Hoş Geldiniz',
    createAccount: 'Hesap oluştur',
    newToPhoboo: 'Phoboo\'da yeni misiniz?',
    logInGoogle: 'Google ile giriş yap',
    orEnterDetails: 'Veya detayları girin',
    email: 'E-posta',
    password: 'Şifre',
    signIn: 'Giriş Yap',
    forgot: 'Unuttun mu?',
    createFreeAccount: 'Ücretsiz hesabınızı oluşturun',
    alreadyHaveAccount: 'Zaten bir hesabınız var mı?',
    login: 'Giriş yap',
    signUpGoogle: 'Google ile kaydolun',
    signUpApple: 'Apple ile kaydolun',
    orUseEmail: 'Veya e-postanızı kullanın',
    emailAddress: 'E-posta Adresi',
    fullName: 'Tam Ad',
    createAccountLabel: 'Hesap Oluştur',
    continueWithEmail: 'E-posta ile Devam Et',
    pricingTitle: 'Fiyatlandırma ve',
    plans: 'Planlar',
    pricingDesc: 'Fotoğrafçılık işletmenizle ölçeklenen basit, şeffaf fiyatlandırma sunuyoruz. Planları karşılaştırın ve size en uygun olanı bulun.',
    monthly: 'Aylık',
    yearly: 'Yıllık',
    saveUpTo: '%40\'a varan tasarruf edin',
    perMonth: '/ay',
    free: 'Ücretsiz',
    starter: 'Başlangıç',
    pro: 'Pro',
    proPlus: 'Pro Plus',
    tryCoreFeatures: 'Temel özellikleri ücretsiz deneyin',
    perfectForBeginners: 'Yeni başlayanlar için mükemmel',
    mostPopularChoice: 'En popüler seçim',
    forFullScale: 'Tam ölçekli operasyonlar için',
    buyNow: 'Şimdi Satın Al',
    mostPopular: 'En Popüler',
    heicSupport: 'Apple Görüntü Formatı (.HEIC) Desteği',
    unlimitedEmail: 'Sınırsız e-posta bildirimi',
    twoEvents: '2 etkinlik',
    unlimitedEvents: 'Sınırsız etkinlik',
    unlimitedFaceSearch: 'Sınırsız yüz araması',
    photoUpload15: '15 MB fotoğraf yükleme',
    photoUpload50: '50 MB fotoğraf yükleme',
    storage10: '10 GB depolama',
    storage125: '125 GB depolama',
    storage500: '500 GB depolama',
    storage1000: '1000 GB depolama',
    uncompressedPhotos: 'Sıkıştırılmamış Fotoğraflar',
    saveWithYearly: 'YILLIK ÖDEME İLE %50 TASARRUF EDİN',
    normally: 'Normalde',
    billedYearly: 'Yıllık faturalandırılır',
    whatsIncluded: 'Neler Dahil',
    cancelAnytime: 'İstediğiniz zaman yükseltebilir, düşürebilir veya iptal edebilirsiniz — uzun vadeli taahhüt yok.',
    undoNote: 'Bu işlem geri alınamaz ve tüm veriler kalıcı olarak kaldırılacaktır.',
    showingAll: 'Gösteriliyor: Tümü',
    searchFile: 'Dosya ara',
    smartAutoRotate: 'Akıllı Otomatik Döndür',
    confirmAutoRotateSelected: 'Seçilen {count} fotoğrafın yönünü düzeltmek istiyor musunuz? Bu işlem onları kalıcı olarak doğal konumlarına ayarlayacaktır.',
    confirmAutoRotateAll: 'Bu etkinlikteki tüm fotoğraflar, kamera meta verilerine göre otomatik olarak yönlendirilecektir. Bu, insanların doğal görünmesini sağlamaya yardımcı olur. Devam edilsin mi?',
    oldestFirst: 'Önce en eski',
    newestFirst: 'Önce en yeni',
    dragAndDrop: 'Sürükle ve Bırak',
    uploadImages: 'Resimleri Yükle',
    publish: 'Yayınla',
    setCoverImage: 'Kapak Resmi Ayarla',
    addFolder: 'Klasör Ekle',
    moreOptions: 'Daha Fazla Seçenek',
    setCover: 'Kapak Ayarla',
    highlights: 'Öne Çıkanlar',
    myEvents: 'Etkinliklerim',
    recentEvents: 'Son Etkinlikler',
    createNewEvent: 'Yeni Etkinlik Oluştur',
    searchEvents: 'Etkinlikleri ara',
    sortBy: 'Sırala',
    viewDetails: 'Detayları Görüntüle',
    editEvent: 'Etkinliği Düzenle',
    deleteEvent: 'Etkinliği Sil',
    confirmDelete: 'Silmeyi Onayla',
    deletePermanently: 'Kalıcı Olarak Sil',
    wait: 'Bekleyin',
    grid: 'Izgara',
    list: 'Liste',
    photoDetails: 'Fotoğraf Detayları',
    imagesSelected: 'Fotoğraf Seçildi',
    selectAll: 'Hepsini Seç',
    hide: 'Gizle',
    unhide: 'Göster',
    delete: 'Sil',
    download: 'İndir',
    move: 'Taşı',
    rotate: 'Döndür',
    fullResolution: 'Tam Çözünürlük',
    share: 'Paylaş',
    of: '/',
    publicProfile: 'Genel Profil',
    manageProfessionalInfo: 'Profesyonel bilgilerinizi ve konuklara nasıl göründüğünü yönetin.',
    deletePhoto: 'Fotoğrafı Sil',
    security: 'Güvenlik',
    setPassword: 'Şifre Belirle',
    newPassword: 'Yeni Şifre',
    confirmNewPassword: 'Yeni Şifreyi Onayla',
    passwordsDoNotMatch: 'Şifreler eşleşmiyor',
    characterLimitExceeded: 'Karakter sınırı aşıldı',
    nameLabel: 'Ad *',
    descLabel: 'Açıklama',
    durationLabel: 'Etkinlik Süresi',
    dateLabel: 'Etkinlik Tarihi',
    startDateLabel: 'Başlangıç Tarihi',
    endDateLabel: 'Bitiş Tarihi',
    singleDay: 'Tek Gün',
    multipleDays: 'Çoklu Gün',
    namePlaceholder: 'Etkinlik Adı',
    descPlaceholder: 'Etkinlik Açıklaması',
    discardChanges: 'Değişiklikleri At',
    saveChanges: 'Değişiklikleri Kaydet',
    totalEvents: 'toplam etkinlik',
    totalFolders: 'klasör',
    storageUsed: 'kullanılan alan',
    dateCreated: 'Oluşturulma Tarihi',
    eventDate: 'Etkinlik Tarihi',
    photoCount: 'Fotoğraf Sayısı',
    storageSize: 'Depolama Boyutu',
    name: 'Ad',
    event: 'Etkinlik',
    photos: 'Fotoğraflar',
    faceSearches: 'Yüz Aramaları',
    registrations: 'Kayıtlar',
    status: 'Durum',
    fromDate: 'Başlangıç Tarihi',
    toDate: 'Bitiş Tarihi',
    actions: 'İşlemler',
    eventIdLabel: 'Etkinlik ID',
    draft: 'Taslak',
    published: 'Yayınlandı',
    generalSettings: 'Genel Ayarlar',
    shareSettings: 'Paylaşım Ayarları',
    galleryDesign: 'Galeri Tasarımı',
    eventNameLabel: 'Etkinlik Adı *',
    albumPresets: 'Albüm Hazır Ayarları',
    themeClassicCream: 'Klasik Krem',
    themeAlmondWhite: 'Badem Beyazı',
    themeModernDark: 'Modern Karanlık',
    themeEtherealBlue: 'Ethereal Mavi',
    themeRoyalGold: 'Kraliyet Altını',
    themeVelvetNight: 'Kadife Gece',
    coverStyles: 'Kapak Stilleri',
    coverStyleClassicOval: 'Klasik Oval',
    coverStyleElegantPill: 'Zarif Hap',
    coverStyleSoftCircle: 'Yumuşak Daire',
    coverStyleBrutalistRect: 'Brutalist Dikdörtgen',
    livePreview: 'Canlı Ön İzleme',
    accessType: 'Erişim Türü',
    faceSearchAccess: 'Yüz arama erişimi',
    fullAccess: 'Tam erişim',
    guestLinks: 'Ziyaretçi Bağlantıları',
    fullAccessGallery: 'Tam Erişimli Galeri',
    faceSearchAccessOnly: 'Sadece Yüz Arama Erişimi',
    downloadQRCodes: 'QR Kodlarını İndir',
    downloadQRDesc: 'Bunları masa kartlarına yazdırın veya etkinlik alanınızda görüntüleyin.',
    downloadKit: 'İndirme Kiti',
    passwordProtection: 'Şifre Koruması',
    passwordProtectionDesc: 'Galerinizi 4 haneli bir PIN ile koruyun',
    securityPIN: 'Güvenlik PIN\'i',
    copy: 'Kopyala',
    eventRegistration: 'Etkinlik Kaydı',
    eventRegistrationDesc: 'Görüntülemeden önce konukların kaydolmasını isteyin',
    visible: 'Görünür',
    hidden: 'Gizli',
    showOnGuestPage: 'Ziyaretçi Sayfasında Göster',
    profilePicture: 'Profil Resmi',
    profileLabel: 'Profil',
    surname: 'Soyad',
    googleSignInDesc: 'Google ile giriş yaptınız',
    notSet: 'Ayarlanmadı',
    socialMediaLabel: 'Sosyal Medya',
    contactVisibilityLabel: 'İletişim ve Görünürlük',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
    linkedInLabel: 'LinkedIn',
    pinterestLabel: 'Pinterest',
    today: 'Bugün',
    month: 'Ay',
    year: 'Yıl',
    clickToViewDetail: 'Detayları görmek için tıklayın',
    loadingGallery: 'Galeri yükleniyor...',
    theGallery: 'Galeri',
    showingMoments: 'an gösteriliyor',
    wideView: 'Geniş Görünüm',
    standardView: 'Standart Görünüm',
    compactView: 'Sıkışık Görünüm',
    findYourSpecialMoments: 'Özel Anlarınızı Bulun',
    uploadSelfieDesc: 'Kendinizin bir fotoğrafını yükleyin, yapay zekamız etkinlikten gülümsediğiniz her kareyi bulacaktır.',
    takeASelfie: 'Selfie Çek',
    uploadProfile: 'Profil Yükle',
    privacyFirstDesc: 'Önce Gizlilik: Fotoğrafınız yalnızca arama yapmak için kullanılır',
    privateAccessTitle: 'Özel Erişim',
    privateAccessDesc: 'Eşleşen fotoğraflarınızı yalnızca siz görürsünüz',
    highQualityTitle: 'Yüksek Kalite',
    highQualityDesc: 'Sıkıştırılmamış orijinalleri indirin',
    instantResultsTitle: 'Anında Sonuçlar',
    instantResultsDesc: 'Binlerce fotoğraf arasından saniyeler içinde anılarınızı bulun',
    personalInfo: 'Kişisel Bilgiler',
    updateProfile: 'Profili Güncelle',
    firstName: 'Ad',
    lastName: 'Soyad',
    phoneNumber: 'Telefon Numarası',
    visibility: 'Görünürlük',
    showEmail: 'E-postayı ziyaretçi sayfasında göster',
    showPhone: 'Telefonu ziyaretçi sayfasında göster',
    changePassword: 'Şifreyi Değiştir',
    currentPassword: 'Mevcut Şifre',
    confirmPassword: 'Yeni Şifreyi Onayla',
    save: 'Kaydet',
    cancel: 'İptal',
    confirm: 'Onayla',
    noPhotosNeedRotate: 'Fotoğrafların yönünü düzeltmeye gerek yok.',
    successOriented: '{count} fotoğraf başarıyla yönlendirildi!',
    welcomeToEvent: 'Hoş geldiniz',
    galleryBy: '{name} tarafından galeri',
    viewGallery: 'Galeriye Göz At',
    faceSearch: 'Yüz Arama',
    searchByFace: 'Yüz ile Ara',
    uploadFaceDesc: 'Bir selfie yükleyin, etkinlikteki tüm fotoğraflarınızı bulalım.',
    findMyPhotos: 'Fotoğraflarımı Bul',
    noPhotosFound: 'Fotoğraf bulunamadı',
    heroTitle: 'Etkinlik fotoğraflarını teslim etmenin',
    heroSub: 'en hızlı yolu.',
    shoot: 'Çek',
    upload: 'Yükle',
    delivered: 'Teslim Edildi',
    instantMatching: 'Anında Eşleşme',
    aiFaceSearch: 'Yapay zeka yüz araması',
    aiFaceSearchDesc: 'Gelişmiş yüz tanıma kullanarak içinde olduğunuz her fotoğrafı anında bulun.',
    smartFiltering: 'Akıllı filtreleme',
    smartFilteringDesc: 'Tüm galerileri cinsiyet ve kişi sayısına göre zahmetsizce sıralayın.',
    elegantUI: 'Zarif galeri arayüzü',
    elegantUIDesc: 'Üst düzey etkinlikler için tasarlanmış premium, dikkat dağıtmayan bir izleme deneyimi.',
    oneTapSharing: 'Tek dokunuşla paylaşım',
    oneTapSharingDesc: 'Tek bir dokunuşla yüksek çözünürlüklü anıları anında indirin veya paylaşın.',
    whyChoose: 'Neden Phoboo?',
    whyChooseSub: 'Modern etkinlik fotoğrafçıları için profesyonel hız ve basitlik.',
    howItWorks: 'Phoboo Nasıl Çalışır?',
    howItWorksSub: 'Galeri teslimatınızı otomatikleştirmek için üç basit adım.',
    step1Title: 'Etkinliğinizi Oluşturun',
    step1Desc: 'Etkinliğinizi saniyeler içinde kurun.',
    step2Title: 'Fotoğraflarınızı Yükleyin',
    step2Desc: 'Tüm fotoğrafları tek seferde yükleyin veya istediğiniz zaman ekleyin.',
    step3Title: 'Paylaşın ve Konuklar Fotoğrafları Bulsun',
    step3Desc: 'Bir QR veya bağlantı paylaşın. Konuklar göz atabilir veya yapay zeka ile kendilerininkini anında bulabilir.',
    builtForEvery: 'Her Durum İçin Tasarlandı',
    builtForEverySub: 'Çeşitli fotoğrafçılık nişleri için özel iş akışları.',
    seeAllCategories: 'Tüm kategorileri gör',
    readyToAutomate: 'Teslimatınızı otomatikleştirmeye hazır mısın?',
    getStartedNow: 'Bugün ücretsiz başlayın ve fotoğraf teslimatınızı dönüştürün.',
    getStarted: 'Başlayın',
    aiFaceSearchWhyDesc: 'Konuklar, yapay zeka destekli yüz aramasıyla fotoğraflarını anında bulur.',
    qrSharingTitle: 'QR Tabanlı Paylaşım',
    qrSharingDesc: 'Tek bir bağlantı veya QR kodu paylaşın. Herkes anında erişim sağlasın.',
    autoExpiringTitle: 'Otomatik Süresi Dolan Etkinlikler',
    autoExpiringDesc: 'Her şeyi basit ve güvenli tutmak için etkinliklerin süresi belirlenen bir süre sonra otomatik olarak dolar.',
    smartBrowsingTitle: 'Akıllı Tarama ve Filtreler',
    smartBrowsingDesc: 'Konuklar tüm fotoğraflara göz atabilir veya cinsiyet, grup boyutu ve daha fazlasına göre filtreleyebilir.',
    collaborativeEventsTitle: 'İş Birliğine Dayalı Etkinlikler',
    collaborativeEventsDesc: 'Bir etkinliğe birden fazla fotoğrafçı davet edin ve fotoğrafları birlikte sorunsuz bir şekilde yükleyin.',
    privacySafeTitle: 'Gizlilik Odaklı Tanıma',
    privacySafeDesc: 'Yüz tanıma gizlilik ön planda tutularak oluşturulmuştur; verileriniz güvenli ve koruma altındadır.',
    categoryWeddings: 'Düğünler',
    categoryWeddingsDesc: 'Otomatik konuk galerileri.',
    categoryCorporate: 'Kurumsal',
    categoryCorporateDesc: 'Vesikalık çekimler ve seminerler.',
    categorySports: 'Spor',
    categorySportsDesc: 'Sporcu fotoğraf etiketleme.',
    categoryNightlife: 'Gece Hayatı',
    categoryNightlifeDesc: 'Kulüp ve festival paylaşımı.',
    poweredBy: 'Phoboo tarafından desteklenmektedir',
    photographer: 'Profesyonel Fotoğrafçı',
    meetPhotographer: 'Fotoğrafçı ile Tanışın',
    footerDesc: 'Akıllı otomasyon ve sorunsuz bulut teslimatı yoluyla profesyonel fotoğrafçılığı yükseltiyoruz.',
    copyright: '© 2024 Phoboo. Tüm hakları saklıdır.',
    legal: 'Yasal',
    privacy: 'Gizlilik',
    terms: 'Şartlar',
    supportTitle: 'Destek',
    globalSupport: 'Küresel Destek',
    documentation: 'Dokümantasyon',
    connect: 'Bağlan',
    weekdaysShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    weekdaysMin: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
  },
  ru: {
    home: 'Главная',
    pricing: 'Цены',
    events: 'Мероприятия',
    calendar: 'Календарь',
    about: 'О нас',
    contact: 'Контакты',
    profile: 'Профиль',
    signOut: 'Выйти',
    freePlan: 'Бесплатный план',
    welcomeBack: 'С возвращением',
    createAccount: 'Создать аккаунт',
    newToPhoboo: 'Впервые в Phoboo?',
    logInGoogle: 'Войти через Google',
    orEnterDetails: 'Или введите данные',
    email: 'Email',
    password: 'Пароль',
    signIn: 'Войти',
    forgot: 'Забыли?',
    createFreeAccount: 'Создайте бесплатный аккаунт',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    login: 'Войти',
    signUpGoogle: 'Зарегистрироваться через Google',
    signUpApple: 'Зарегистрироваться через Apple',
    orUseEmail: 'Или используйте email',
    emailAddress: 'Адрес электронной почты',
    fullName: 'Полное имя',
    createAccountLabel: 'Создать аккаунт',
    continueWithEmail: 'Продолжить через Email',
    pricingTitle: 'Цены и',
    plans: 'Тарифы',
    pricingDesc: 'Мы предлагаем простые и прозрачные цены, которые растут вместе с вашим бизнесом. Сравните тарифы и найдите идеальный для вас.',
    monthly: 'Месяц',
    yearly: 'Год',
    saveUpTo: 'Экономия до 40%',
    perMonth: '/мес',
    free: 'Бесплатно',
    starter: 'Стартовый',
    pro: 'Профи',
    proPlus: 'Профи Плюс',
    tryCoreFeatures: 'Попробуйте основные функции бесплатно',
    perfectForBeginners: 'Идеально для новичков',
    mostPopularChoice: 'Самый популярный выбор',
    forFullScale: 'Для полноценной работы',
    buyNow: 'Купить сейчас',
    mostPopular: 'Самый популярный',
    heicSupport: 'Поддержка формата Apple (.HEIC)',
    unlimitedEmail: 'Безлимитные email-уведомления',
    twoEvents: '2 мероприятия',
    unlimitedEvents: 'Безлимитные мероприятия',
    unlimitedFaceSearch: 'Безлимитный поиск по лицам',
    photoUpload15: 'Загрузка фото до 15 МБ',
    photoUpload50: 'Загрузка фото до 50 МБ',
    storage10: '10 ГБ хранилища',
    storage125: '125 ГБ хранилища',
    storage500: '500 ГБ хранилища',
    storage1000: '1000 ГБ хранилища',
    uncompressedPhotos: 'Фото без сжатия',
    saveWithYearly: 'ЭКОНОМЬТЕ 50% ПРИ ГОДОВОЙ ОПЛАТЕ',
    normally: 'Обычно',
    billedYearly: 'При годовой оплате',
    whatsIncluded: 'Что включено',
    cancelAnytime: 'Вы можете изменить тариф или отменить подписку в любое время — никаких долгосрочных обязательств.',
    undoNote: 'Это действие нельзя отменить, и все данные будут безвозвратно удалены.',
    showingAll: 'Показаны: Все',
    searchFile: 'Поиск файла',
    smartAutoRotate: 'Умный автоповорот',
    confirmAutoRotateSelected: 'Вы хотите исправить ориентацию {count} выбранных фотографий? Это навсегда приведет их в естественное положение.',
    confirmAutoRotateAll: 'Все фотографии в этом мероприятии будут автоматически ориентированы на основе метаданных камеры. Это поможет людям выглядеть естественно. Продолжить?',
    oldestFirst: 'Сначала старые',
    newestFirst: 'Сначала новые',
    dragAndDrop: 'Перетащите сюда',
    uploadImages: 'Загрузить фото',
    publish: 'Опубликовать',
    setCoverImage: 'Установить обложку',
    addFolder: 'Добавить папку',
    moreOptions: 'Дополнительно',
    setCover: 'Сделать обложкой',
    highlights: 'Основные моменты',
    myEvents: 'Мои мероприятия',
    recentEvents: 'Последние мероприятия',
    createNewEvent: 'Создать мероприятие',
    searchEvents: 'Поиск мероприятий',
    sortBy: 'Сортировка',
    viewDetails: 'Подробнее',
    editEvent: 'Редактировать',
    deleteEvent: 'Удалить',
    confirmDelete: 'Подтвердите удаление',
    deletePermanently: 'Удалить навсегда',
    wait: 'Подождите',
    grid: 'Сетка',
    list: 'Список',
    photoDetails: 'Детали фото',
    imagesSelected: 'Изображений выбрано',
    selectAll: 'Выбрать все',
    hide: 'Скрыть',
    unhide: 'Показать',
    delete: 'Удалить',
    download: 'Скачать',
    move: 'Переместить',
    rotate: 'Повернуть',
    fullResolution: 'Полное разрешение',
    share: 'Поделиться',
    of: 'из',
    publicProfile: 'Публичный профиль',
    manageProfessionalInfo: 'Управляйте вашей профессиональной информацией и тем, как она отображается для гостей.',
    deletePhoto: 'Удалить фото',
    security: 'Безопасность',
    setPassword: 'Установить пароль',
    newPassword: 'Новый пароль',
    confirmNewPassword: 'Подтвердите новый пароль',
    passwordsDoNotMatch: 'Пароли не совпадают',
    characterLimitExceeded: 'Лимит символов превышен',
    nameLabel: 'Название *',
    descLabel: 'Описание',
    durationLabel: 'Продолжительность',
    dateLabel: 'Дата мероприятия',
    startDateLabel: 'Дата начала',
    endDateLabel: 'Дата окончания',
    singleDay: 'Один день',
    multipleDays: 'Несколько дней',
    namePlaceholder: 'Название мероприятия',
    descPlaceholder: 'Описание мероприятия',
    discardChanges: 'Отменить изменения',
    saveChanges: 'Сохранить изменения',
    totalEvents: 'всего мероприятий',
    totalFolders: 'папок',
    storageUsed: 'использовано места',
    dateCreated: 'Дата создания',
    eventDate: 'Дата мероприятия',
    photoCount: 'Кол-во фото',
    storageSize: 'Объем памяти',
    name: 'Название',
    event: 'Мероприятие',
    photos: 'Фотографии',
    faceSearches: 'Поиски лиц',
    registrations: 'Регистрации',
    status: 'Статус',
    fromDate: 'Дата начала',
    toDate: 'Дата окончания',
    actions: 'Действия',
    eventIdLabel: 'ID Мероприятия',
    draft: 'Черновик',
    published: 'Опубликовано',
    generalSettings: 'Общие настройки',
    shareSettings: 'Настройки доступа',
    galleryDesign: 'Дизайн галереи',
    eventNameLabel: 'Название мероприятия *',
    albumPresets: 'Пресеты альбома',
    themeClassicCream: 'Классический крем',
    themeAlmondWhite: 'Миндально-белый',
    themeModernDark: 'Современный темный',
    themeEtherealBlue: 'Эфирный синий',
    themeRoyalGold: 'Королевское золото',
    themeVelvetNight: 'Бархатная ночь',
    coverStyles: 'Стили обложки',
    coverStyleClassicOval: 'Классический овал',
    coverStyleElegantPill: 'Элегантная капсула',
    coverStyleSoftCircle: 'Мягкий круг',
    coverStyleBrutalistRect: 'Бруталистский прямоуг.',
    livePreview: 'Предпросмотр',
    accessType: 'Тип доступа',
    faceSearchAccess: 'Доступ по поиску лица',
    fullAccess: 'Полный доступ',
    guestLinks: 'Ссылки для гостей',
    fullAccessGallery: 'Галерея с полным доступом',
    faceSearchAccessOnly: 'Только доступ по поиску лица',
    downloadQRCodes: 'Скачать QR-коды',
    downloadQRDesc: 'Распечатайте их на карточках для столов или разместите на месте проведения.',
    downloadKit: 'Скачать комплект',
    passwordProtection: 'Защита паролем',
    passwordProtectionDesc: 'Защитите вашу галерею 4-значным PIN-кодом',
    securityPIN: 'Защитный PIN-код',
    copy: 'Копировать',
    eventRegistration: 'Регистрация на событие',
    eventRegistrationDesc: 'Требовать регистрацию гостей перед просмотром',
    visible: 'Видимый',
    hidden: 'Скрытый',
    showOnGuestPage: 'Показывать на странице гостя',
    profilePicture: 'Фото профиля',
    profileLabel: 'Профиль',
    surname: 'Фамилия',
    googleSignInDesc: 'Вы вошли через Google',
    notSet: 'Не установлено',
    socialMediaLabel: 'Социальные сети',
    contactVisibilityLabel: 'Контакты и видимость',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
    linkedInLabel: 'LinkedIn',
    pinterestLabel: 'Pinterest',
    today: 'Сегодня',
    month: 'Месяц',
    year: 'Год',
    clickToViewDetail: 'Нажмите для подробностей',
    loadingGallery: 'Загрузка галереи...',
    theGallery: 'Галерея',
    showingMoments: 'моментов показано',
    wideView: 'Широкий вид',
    standardView: 'Стандартный вид',
    compactView: 'Компактный вид',
    findYourSpecialMoments: 'Найдите свои особые моменты',
    uploadSelfieDesc: 'Загрузите свое фото, и наш ИИ найдет каждое изображение с мероприятия, где вы улыбаетесь.',
    takeASelfie: 'Сделать селфи',
    uploadProfile: 'Загрузить профиль',
    privacyFirstDesc: 'Конфиденциальность прежде всего: ваше фото используется только для поиска',
    privateAccessTitle: 'Приватный доступ',
    privateAccessDesc: 'Только вы видите свои найденные фото',
    highQualityTitle: 'Высокое качество',
    highQualityDesc: 'Скачивайте оригиналы без сжатия',
    instantResultsTitle: 'Мгновенные результаты',
    instantResultsDesc: 'Находите фото среди тысяч за считанные секунды',
    personalInfo: 'Личная информация',
    updateProfile: 'Обновить профиль',
    firstName: 'Имя',
    lastName: 'Фамилия',
    phoneNumber: 'Номер телефона',
    visibility: 'Видимость',
    showEmail: 'Показывать email гостям',
    showPhone: 'Показывать телефон гостям',
    changePassword: 'Сменить пароль',
    currentPassword: 'Текущий пароль',
    confirmPassword: 'Подтвердите пароль',
    save: 'Сохранить',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    noPhotosNeedRotate: 'Ориентация фотографий не требует исправления.',
    successOriented: '{count} фото успешно ориентированы!',
    welcomeToEvent: 'Добро пожаловать в',
    galleryBy: 'Галерея от {name}',
    viewGallery: 'Галерея',
    faceSearch: 'Поиск по лицу',
    searchByFace: 'Найти по лицу',
    uploadFaceDesc: 'Загрузите селфи, и мы найдем все ваши фото с мероприятия.',
    findMyPhotos: 'Найти мои фото',
    noPhotosFound: 'Фото не найдены',
    heroTitle: 'Самый быстрый способ',
    heroSub: 'доставки фото с мероприятий.',
    shoot: 'Съемка',
    upload: 'Загрузка',
    delivered: 'Доставлено',
    instantMatching: 'Мгновенный подбор',
    aiFaceSearch: 'Поиск по лицу с ИИ',
    aiFaceSearchDesc: 'Мгновенно находите каждое фото, на котором вы есть, с помощью распознавания лиц.',
    smartFiltering: 'Умная фильтрация',
    smartFilteringDesc: 'Легко сортируйте галереи по полу и количеству человек.',
    elegantUI: 'Элегантный интерфейс галереи',
    elegantUIDesc: 'Премиальный опыт просмотра без лишних деталей для элитных мероприятий.',
    oneTapSharing: 'Поделиться в одно касание',
    oneTapSharingDesc: 'Мгновенно скачивайте или делитесь моментами в высоком разрешении одним касанием.',
    whyChoose: 'Почему выбирают Phoboo',
    whyChooseSub: 'Профессиональная скорость и простота для современных фотографов.',
    howItWorks: 'Как работает Phoboo',
    howItWorksSub: 'Три простых шага для автоматизации доставки ваших галерей.',
    step1Title: 'Создайте мероприятие',
    step1Desc: 'Настройте ваше мероприятие за считанные секунды.',
    step2Title: 'Загрузите фотографии',
    step2Desc: 'Загрузите все фото сразу или добавляйте их в любое время.',
    step3Title: 'Поделитесь и позвольте гостям найти фото',
    step3Desc: 'Поделитесь QR-кодом или ссылкой. Гости смогут просматривать или мгновенно находить свои фото с ИИ.',
    builtForEvery: 'Создано для любого случая',
    builtForEverySub: 'Специализированные рабочие процессы для различных ниш фотографии.',
    seeAllCategories: 'Все категории',
    readyToAutomate: 'Готовы автоматизировать доставку?',
    getStartedNow: 'Начните бесплатно сегодня и измените способ доставки ваших фотографий.',
    getStarted: 'Начать',
    aiFaceSearchWhyDesc: 'Гости мгновенно находят свои фотографии с помощью поиска по лицам на базе ИИ.',
    qrSharingTitle: 'Обмен по QR-коду',
    qrSharingDesc: 'Поделитесь одной ссылкой или QR-кодом. Все получают мгновенный доступ.',
    autoExpiringTitle: 'Мероприятия с автозавершением',
    autoExpiringDesc: 'Мероприятия автоматически завершаются через заданное время для простоты и безопасности.',
    smartBrowsingTitle: 'Умный просмотр и фильтры',
    smartBrowsingDesc: 'Гости могут просматривать все фото или фильтровать их по полу, размеру группы и многому другому.',
    collaborativeEventsTitle: 'Командные мероприятия',
    collaborativeEventsDesc: 'Приглашайте нескольких фотографов на одно мероприятие и загружайте фотографии вместе.',
    privacySafeTitle: 'Безопасное распознавание',
    privacySafeDesc: 'Распознавание лиц создано с учетом конфиденциальности — ваши данные под защитой.',
    categoryWeddings: 'Свадьбы',
    categoryWeddingsDesc: 'Автоматизированные галереи для гостей.',
    categoryCorporate: 'Корпоративы',
    categoryCorporateDesc: 'Портреты и семинары.',
    categorySports: 'Спорт',
    categorySportsDesc: 'Тегирование фотографий атлетов.',
    categoryNightlife: 'Ночная жизнь',
    categoryNightlifeDesc: 'Обмен фото из клубов и с фестивалей.',
    poweredBy: 'На базе Phoboo',
    photographer: 'Профессиональный фотограф',
    meetPhotographer: 'Познакомьтесь с фотографом',
    footerDesc: 'Повышение уровня профессиональной фотографии с помощью интеллектуальной автоматизации и бесшовной облачной доставки.',
    copyright: '© 2024 Phoboo. Все права защищены.',
    legal: 'Юридическая информация',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
    supportTitle: 'Поддержка',
    globalSupport: 'Глобальная поддержка',
    documentation: 'Документация',
    connect: 'Связаться',
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekdaysMin: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
  }
};
