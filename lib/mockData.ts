import type { Property, RepairTicket, ServiceProvider, CommunityPost } from "@/types";

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    title: "Lush Gardens Apartment",
    location: "Victoria Island, Lagos",
    price: 1200,
    beds: 2,
    baths: 2,
    sqft: 850,
    verified: true,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgs-K6Vkf6yIKthCW5kO-ilpiI56s6Az-SvIrtxj3EvDkD7Qc0yxJ1NNHFfRgcTHW4SHf5zKV_ezBA8VvWbVSrqVOFyEOG6RTn9SVa-9NN9rM0E6PFvLoN5k5fNWcNSZlPHZGCEmfWarQf-uvCGJRvwLbdl9vBZV0zX1-JHFl2eZq08wnlWyLglW_Azbkw8ahlaCGgqANUbkkCK8ikch_oYdRjZMYPS9-BeCWdPCFF96jrFMkKmUO4k5w_P74hbUjul8uXcVSNr-pY",
    // tags: ["WiFi", "Parking", "Security"],
  },
  {
    id: "prop-2",
    title: "Blue Horizon Apartments",
    location: "Lekki Phase 1, Lagos",
    price: 950,
    beds: 1,
    baths: 1,
    sqft: 600,
    verified: true,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3ls3tBde1htQYTewXMFKLkY6emQM25OUjpTzOQ1hQvsVx9-3INpPQnkLfBe-gGi41NEPlhM2XoJhiUbIGpbHG4KrL8bRYbl8_4w3S3lBG0CaaPvXeZeGE3zIkJIw0g1Qk5w_zNNTXo0Zt2NfU29J_XPSHYLxVokddYtOdRXNDUl-SqCsTXK6palTQe1Cf7P-I7eyHFZjcZKAZCVwueyR-ctcDG3UcTNv4hQanohfZkQyOAoMqc7CjmqKhpgRcxBEW8h-lK9Yjnlao",
  },
  {
    id: "prop-3",
    title: "Skyline Suites",
    location: "Ikoyi, Lagos",
    price: 1800,
    beds: 3,
    baths: 2,
    sqft: 1200,
    verified: false,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFEcQ6C_b0G2oz1AVtr-vmkGpbWsHmZQC2V4gB06b6v0Z8tXpIDhvX8IxkJv68JGByjFuZJSweTwJjVPkormKnxeFTaG05CG6lb7wEx4aXXct98Bmksfu4oxWSYp-R77rXsA0Kgd_-mol3C0sVQh-L5S4asDWIfDJ9THhfFAEB2I3qfpkyI7hxPcjOcSZnN_ECrO-hyiF-XjkDy1wk6qtD8d-vjpCbCIpHvZWtyDPE1k7n6fqP32K4SisjYlFUU17YjMveStZMnrvc",
  },
];

export const mockRepairs: RepairTicket[] = [
  {
    id: "AC-2940",
    title: "AC Unit Repair",
    status: "in_progress",
    priority: "high",
    reportedAt: "Oct 12",
    assignedTo: "James Okafor",
    progress: 66,
  },
  {
    id: "TAP-1024",
    title: "Leaking Tap",
    status: "in_progress",
    priority: "medium",
    reportedAt: "Oct 24",
    assignedTo: "David M. (Plumber)",
    progress: 50,
  },
  {
    id: "ELEC-305",
    title: "Electrical Fault",
    status: "reported",
    priority: "high",
    reportedAt: "Oct 28",
    progress: 10,
  },
];

export const mockServices: ServiceProvider[] = [
  {
    id: "svc-1",
    name: "John Doe",
    category: "Plumber",
    rating: 4.9,
    reviews: 128,
    verified: true,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDR2kezFLojp5BwhX0P5eJ4F8AdkmFt0HIPpreuYGz6Vm6gV1beRWTX7GwyxN0iCeyWd6M2-Was4drZo-sEF_m71qQCYdtthx2sn2us-AHP1t0_JDz3qa18Z5-7LSlToEszJjiXFTBu5udmI_sufpmtlyaixp0hbRjdsWoQ4MYDGIjMZE47G807WpWCY_2KSSHRycMlmK5g7vCz5oltTIMCXd_ZsG2dVUBqEIuerA6JzCErpESbXFERwbAEylyjS4-fNsGynSQM9cLw",
    price: "₦5,000/hr",
  },
  {
    id: "svc-2",
    name: "Sarah Mensah",
    category: "Electrician",
    rating: 4.7,
    reviews: 94,
    verified: true,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6CUuXqzyyWxvPvWG5nEIlI6oSwA_N8HzHEAYBPF4jaIxbAY4Ss0qEOye8LCIx6-oASbyz4M2PeFKJ59D5hk0Uwy49Nu1We8jomvsfkpJNiHApGxvR8zFjomnXOV6rJvCzhmrVvN9XF7GWUEEKJXEhfWQ4U3cphVhKafb75Z8TQUyKgmDGAswy_W9X0mqQPy2GZVvObtgwGp0JG-IKylpdcNHINp-EnQZkexLsaGdIfi2PU_GbTKlmJQkm_xh4DeY9m-zWg0NuBkoE",
    price: "₦6,500/hr",
  },
  {
    id: "svc-3",
    name: "Emeka Nwosu",
    category: "Carpenter",
    rating: 4.5,
    reviews: 62,
    verified: false,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFEcQ6C_b0G2oz1AVtr-vmkGpbWsHmZQC2V4gB06b6v0Z8tXpIDhvX8IxkJv68JGByjFuZJSweTwJjVPkormKnxeFTaG05CG6lb7wEx4aXXct98Bmksfu4oxWSYp-R77rXsA0Kgd_-mol3C0sVQh-L5S4asDWIfDJ9THhfFAEB2I3qfpkyI7hxPcjOcSZnN_ECrO-hyiF-XjkDy1wk6qtD8d-vjpCbCIpHvZWtyDPE1k7n6fqP32K4SisjYlFUU17YjMveStZMnrvc",
    price: "₦4,000/hr",
  },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "Amara K.",
    authorRole: "Verified Tenant",
    tag: "Safety",
    content:
      "Has anyone else noticed the gate has been left open at night? I've reported it twice but no response. Let's stay vigilant!",
    likes: 24,
    comments: 7,
    timeAgo: "2h ago",
  },
  {
    id: "post-2",
    author: "Chidi O.",
    authorRole: "Tenant",
    tag: "Maintenance",
    content:
      "The plumber RentWise assigned was super professional. Fixed my leaking pipe in under an hour. Highly recommend verified services!",
    likes: 41,
    comments: 12,
    timeAgo: "5h ago",
  },
  {
    id: "post-3",
    author: "Fatima A.",
    authorRole: "Tenant",
    tag: "Leasing",
    content:
      "Quick question — does anyone know if we can sublease for a month? My landlord hasn't replied to my messages yet.",
    likes: 8,
    comments: 4,
    timeAgo: "1d ago",
  },
];
