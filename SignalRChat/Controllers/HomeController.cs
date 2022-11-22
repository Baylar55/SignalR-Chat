using Microsoft.AspNetCore.Mvc;
using SignalRChat.Models;
using System.Diagnostics;

namespace SignalRChat.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}